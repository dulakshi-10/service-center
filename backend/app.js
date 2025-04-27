const express = require('express');
const mysql = require('mysql2');
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { authenticateJWT } = require('./middleware'); // Import JWT middleware

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

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

            res.json({ message: 'Login successful', token, id: results[0].id, name: results[0].name, email: results[0].email });
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

    console.log("isAdvancePaid", req)

    // Validate required fields
    if (!userId || !vehicleId || !orderDate || !orderTime || !email) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const query = `
        INSERT INTO vehicle_service_orders 
        (user_id, vehicle_id, washing_type, oil_check_type, additional_services, order_date, order_time, additional_note, isAdvancePaid)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [userId, vehicleId, washingType, oilCheckType, additionalServices, orderDate, orderTime, additionalNote, isAdvancePaid],
        (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
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
                    Advanced paid: Yes
                                        
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

// Start the backend server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
