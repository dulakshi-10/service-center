import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="App">
      <div 
        className="home-container" 
        style={{ backgroundImage: `url('/images/bg.jpg')` }}  // 'public/images/bg.jpg' direct reference
      >
        <h2>Sachith Service Center</h2>
      </div>
    </div>
  );
}

export default Home;
