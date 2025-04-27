import React from 'react';
import './Home.css';

function Home() {
  return (
      <div 
        className="home-container" 
        style={{ backgroundImage: `url('/images/home.jpg')` }}  // 'public/images/bg.jpg' direct reference
      >
        <h2>Sachith Service Center</h2>
      </div>
  );
}

export default Home;
