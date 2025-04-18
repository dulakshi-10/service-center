import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-container">
        <h1>Sachith Service Center</h1>
    <div className="contact-wrapper">
      {/* Image Side */}
      <div 
        className="about-image" 
        style={{ 
          backgroundImage: `url('/images/contact.jpeg')`, // Make sure image path is correct
          width: '150%',
          height: '35vh',
          backgroundSize: 'cover',
         
        }} 
      />

      {/* Contact Info Side */}
  
        <div className="contact-details">
          <div className="contact-item">
            <h3>Facebook</h3>
            <p>Sachith Service Center</p>
          </div>
          <div className="contact-item">
            <h3>Phone Number</h3>
            <p>037 7342535</p>
          </div>
          <div className="contact-item">
            <h3>Email</h3>
            <p>sachithservice@gmail.com</p>
          </div>
          <div className="contact-item">
            <h3>WhatsApp Number</h3>
            <p>077 452353</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
