import React from 'react';
import '../css/Footer.css';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <Link to="/" className="footer-link">Home</Link>
        <Link to="/about" className="footer-link">About</Link>
      </div>
      <div className="footer-info">
<p>This is a fan project. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
