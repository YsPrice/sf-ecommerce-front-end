import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/./About.css'

export const AboutPage = () => {
  const navigate = useNavigate()
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <p>Welcome to Street Fighter for Hire! We are dedicated to providing you with the best shopping experience. Our site offers a wide range of fighters to cater to all your needs. Sign up to place an order and enjoy browsing through our collections to find exactly what you're looking for!</p>
      
      <div className="about-images">
   
        <img src="https://res.cloudinary.com/ducg1tnoi/image/upload/v1707147056/4773a219578e284f2851de70eb217f28_kpw9yt.jpg" alt="About Image 2" />
      </div>
      
      <button className="start-shopping-btn" onClick={handleStartShopping}>
        Start Shopping
      </button>
    </div>
  );

  function handleStartShopping() {
navigate('/categories')
  }
};

export default AboutPage;
