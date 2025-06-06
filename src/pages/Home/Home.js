import React from 'react';
import './Home.css';

function Home() {
  return (
    <div 
      className="home-container" 
      style={{ backgroundImage: `url('/images/w.jpeg')` }}
    >
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

<div className="contact-overlay">
  <h2>Contact Us</h2>
  <p><i className="fas fa-phone-alt" style={{ color: "#00ffcc" }}></i> &nbsp;<strong>Telephone:</strong> +94 77 123 4567</p>
  <p><i className="fab fa-facebook" style={{ color: "#1877f2" }}></i> &nbsp;<strong>Facebook:</strong> Sachith Service Center</p>
  <p><i className="fas fa-envelope" style={{ color: "#ffcc00" }}></i> &nbsp;<strong>Email:</strong> sachith@gmail.com</p>
  <p><i className="fab fa-whatsapp" style={{ color: "#25D366" }}></i> &nbsp;<strong>WhatsApp:</strong> +94 77 123 4567</p>
</div>
    </div>
  );
}

export default Home;

