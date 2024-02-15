import React from 'react';
import '../css/Footer.css'

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <a to="/" className="footer-link">Home</a>
        <a to="/about" className="footer-link">About</a>
      </div>
      <div className="footer-info">
<p>This is a fan project. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
