const express = require('express');
const mysql = require('mysql2');
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { authenticateJWT } = require('./middleware'); // Import JWT middleware
const cors = require('cors');
const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(cors()); // ✅ enable CORS for all routes
// Set up the database connection
const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',    
    password: '',     
    database: 'serviceDB' 
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Could not connect to database:', err);
        process.exit(1);
    }
    console.log('Connected to the database');
});

// Secret key for JWT encoding
const SECRET_KEY = '20001026Garage@@';

// Route for user registration
app.post('/register', (req, res) => {
    const { email, telephone, name, password } = req.body;
    // Simple validation (you can improve this)
    if (!email || !telephone || !name || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Hash password before storing it
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: 'Error hashing password' });
        }

        const query = 'INSERT INTO users (email, telephone, name, password) VALUES (?, ?, ?, ?)';
        db.query(query, [email, telephone, name, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error registering user' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
});

// Route for user login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Simple validation (you can improve this)
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging in' });
        }
        
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the hashed password with the one stored in the database
        bcrypt.compare(password, results[0].password, (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Generate JWT token
            const payload = { userId: results[0].id };
            const token = jwt.encode(payload, SECRET_KEY);

            res.json({ message: 'Login successful', token, id: results[0].id, name: results[0].name, email: results[0].email, isAdmin: results[0].isAdmin });
        });
    });
});

app.post('/create-order', (req, res) => {
    const {
        userId,
        vehicleId,
        washingType,
        oilCheckType,
        additionalServices,
        orderDate,
        orderTime,
        additionalNote,
        email,
        isAdvancePaid
    } = req.body;

    // Validate required fields
    if (!userId || !vehicleId || !orderDate || !orderTime || !email) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // First, check how many existing orders are there for the same date and time
    const checkQuery = `
        SELECT COUNT(*) AS count
        FROM vehicle_service_orders
        WHERE order_date = ? AND order_time = ?
    `;

    db.query(checkQuery, [orderDate, orderTime], (checkErr, checkResult) => {
        if (checkErr) {
            console.error('Error checking existing orders:', checkErr);
            return res.status(500).json({ message: 'Server error while checking time slot availability' });
        }

        const existingCount = checkResult[0].count;

        if (existingCount >= 3) {
            return res.status(400).json({
                message: 'The selected date and time slot is fully booked. Please choose another slot.'
            });
        }

        // Proceed with order creation
        const insertQuery = `
            INSERT INTO vehicle_service_orders 
            (user_id, vehicle_id, washing_type, oil_check_type, additional_services, order_date, order_time, additional_note, isAdvancePaid)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
            insertQuery,
            [userId, vehicleId, washingType, oilCheckType, additionalServices, orderDate, orderTime, additionalNote, isAdvancePaid],
            (insertErr, result) => {
                if (insertErr) {
                    console.error('Error inserting data:', insertErr);
                    return res.status(500).json({ message: 'Error creating order' });
                }

                // Sending confirmation email
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: "sachithservice@gmail.com",
                        pass: "rrty hmmt nxhv evdi",
                    },
                });

                const mailOptions = {
                    from: "sachithservice@gmail.com",
                    to: "sachithservice@gmail.com",
                    subject: 'Order Request',
                    text: `
                        Dear Admin,
                        
                        Order request has been successfully created with the following details:
                        
                        Customer: ${email || 'None'}
                        Vehicle: ${vehicleId}
                        Washing Type: ${washingType}
                        Oil Check Type: ${oilCheckType}
                        Additional Services: ${additionalServices || 'None'}
                        Order Date: ${orderDate}
                        Order Time: ${orderTime}
                        Additional Note: ${additionalNote || 'None'}
                        Advanced paid: ${isAdvancePaid ? 'Yes' : 'No'}
                                            
                        Best Regards,
                        Vehicle Service Team
                    `,
                };

                transporter.sendMail(mailOptions, (mailErr, info) => {
                    if (mailErr) {
                        console.error('Error sending email:', mailErr);
                        return res.status(500).json({ message: 'Order created but failed to send confirmation email' });
                    }

                    res.status(200).json({
                        message: 'Order created successfully',
                        orderId: result.insertId,
                        emailStatus: 'Confirmation email sent',
                    });
                });
            }
        );
    });
});


app.post('/vehicles/add', (req, res) => {
    const {
        userId,
        vehicle_name,
        vehicle_type,
        vehicle_brand,
        vehicle_model,
        vehicle_year,
        transmission,
        engine_capacity,
        registration_number,
        mileage,
        chassis_number,
        made_country
    } = req.body;

    if (!userId || !vehicle_name || !registration_number) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const query = `
        INSERT INTO vehicles (
            user_id, vehicle_name, vehicle_type, vehicle_brand, vehicle_model,
            vehicle_year, transmission, engine_capacity, registration_number,
            mileage, chassis_number, made_country
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [
            userId, vehicle_name, vehicle_type, vehicle_brand, vehicle_model,
            vehicle_year, transmission, engine_capacity, registration_number,
            mileage, chassis_number, made_country
        ],
        (err, result) => {
            if (err) {
                console.error('Error adding vehicle:', err);
                return res.status(500).json({ message: 'Failed to add vehicle' });
            }
            const query = 'SELECT * FROM vehicles WHERE user_id = ?';
            db.query(query, [userId], (err, results) => {
                if (err) return res.status(500).json({ message: 'Error fetching vehicles' });

                res.json(results);
            });
        }
    );
});


app.post('/vehicles/delete', (req, res) => {
    const { vehicleId, userId } = req.body;  // Get the vehicleId from the body
  
    const query = 'DELETE FROM vehicles WHERE id = ?';
  
    db.query(query, [vehicleId], (err, result) => {
      if (err) {
        console.error('Error deleting vehicle:', err);
        return res.status(500).json({ message: 'Failed to delete vehicle' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
  
      const query = 'SELECT * FROM vehicles WHERE user_id = ?';
      db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching vehicles' });
  
        res.json(results);  // Send the updated vehicle list after deletion
      });
    });
  });
  

app.post('/vehicles/my', async (req, res) => {
    const {
        userId,
    } = req.body;
    const query = 'SELECT * FROM vehicles WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching vehicles' });

    res.json(results);
  });
});

app.post('/orders', async (req, res) => {
    const query = 'SELECT * FROM vehicle_service_orders';
    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ message: 'Error fetching orders' });
      res.json(results);
    });
  });
  
app.get('/orders/details', (req, res) => {
    const query = `
    SELECT 
        o.order_id,
        o.order_date,
        o.order_time,
        o.washing_type,
        o.oil_check_type,
        o.additional_services,
        o.additional_note,
        o.payment,
        v.registration_number,
        u.name AS user_name,
        u.email AS user_email
    FROM vehicle_service_orders o
    JOIN vehicles v ON o.vehicle_id = v.id
    JOIN users u ON o.user_id = u.id
    ORDER BY o.order_date DESC, o.order_time DESC
`;


    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching order details:', err);
            return res.status(500).json({ message: 'Server error fetching order details' });
        }

        res.json(results);
    });
});

app.put('/orders/:id', (req, res) => {
  const orderId = req.params.id;
  const { additional_services, payment } = req.body;

  const sql = `
    UPDATE vehicle_service_orders
    SET additional_services = ?, payment = ?
    WHERE order_id = ?
  `;

  db.query(sql, [additional_services, payment, orderId], (err, result) => {
    if (err) {
      console.error('Error updating order:', err);
      return res.status(500).json({ error: 'Failed to update order' });
    }
    res.json({ message: 'Order updated successfully' });
  });
});

app.get('/reporting/summary', (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Start and end dates are required' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();

    if (end < start) {
        return res.status(400).json({ message: 'End date must be after or equal to start date' });
    }

    if (end > today) {
        return res.status(400).json({ message: 'End date cannot be in the future' });
    }

    const query = `
        SELECT 
            YEAR(order_date) AS year,
            MONTH(order_date) AS month,
            COUNT(*) AS total_orders,
            SUM(payment) AS total_advance
        FROM vehicle_service_orders
        WHERE order_date BETWEEN ? AND ?
        GROUP BY YEAR(order_date), MONTH(order_date)
        ORDER BY year, month
    `;

    db.query(query, [startDate, endDate], (err, results) => {
        if (err) {
            console.error('Error fetching report summary:', err);
            return res.status(500).json({ message: 'Server error fetching report summary' });
        }
        res.json(results);
    });
});


// Start the backend server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
