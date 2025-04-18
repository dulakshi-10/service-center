import React, { Component } from 'react';

class AboutUs extends Component {
  render() {
    return (
      <div className="about-us-container">
        <h1 className="welcome-text"><center>Welcome to Sachith Vehicle Service Center</center></h1>
        
        {/* Adding background image to a div */}
        <div 
          className="about-image" 
          style={{ 
            backgroundImage: `url('/images/about.png')`, 
            width: '100%', 
            height: '300px',  // or any height you prefer
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} 
        />
        
        <p>
          Welcome to <strong>Sachith Vehicle Service Center</strong>, where your vehicle’s performance and safety are our top priority! With years of experience and a passion for excellence, we provide top-notch service solutions tailored to your vehicle’s unique needs. Our state-of-the-art facility combines cutting-edge technology with a team of skilled professionals, ensuring your car receives the care it deserves.
        </p>
        <p>
          At <strong>Sachith Vehicle Service Center</strong>, we understand that your time is valuable, which is why we’ve streamlined the service process. Our easy-to-use online platform lets you book appointments, track service history, and manage your vehicle’s maintenance with just a few clicks. From routine oil checks to in-depth diagnostics, we offer a wide range of services designed to keep your vehicle running smoothly.
        </p>
        <p>
          Whether you’re a busy professional, a parent on the go, or someone who simply loves their car, <strong>Sachith Vehicle Service Center</strong> is here to make vehicle maintenance easy and hassle-free. Experience efficiency, trust, and excellence every time you visit!
        </p>
      </div>
    );
  }
}

export default AboutUs;

