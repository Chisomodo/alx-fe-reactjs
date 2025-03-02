import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ 
      backgroundColor: '#f0f0f0', 
      padding: '10px',
      display: 'flex',             // Enable Flexbox
      justifyContent: 'space-between', // Distribute space between items
      alignItems: 'center'        // Vertically align items
    }}>
      <div style={{ /* Add styles for your logo or brand */ }}>
        {/* You might put a logo or brand text here */}
        Your Logo/Brand
      </div>
      
      <ul style={{ 
        listStyle: 'none',        // Remove bullet points
        margin: 0,               // Remove default margins
        padding: 0,              // Remove default padding
        display: 'flex'          // Make the list items arrange horizontally
       }}>
        <li style={{ marginRight: '15px' }}> {/* Add spacing between list items */}
          <Link to="/">Home</Link>
        </li>
        <li style={{ marginRight: '15px' }}>
          <Link to="/about">About</Link>
        </li>
        <li style={{ marginRight: '15px' }}>
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;