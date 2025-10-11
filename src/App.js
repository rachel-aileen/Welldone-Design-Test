import React, { useState } from 'react';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { name: 'Home', isActive: true },
    { name: 'Portfolio', isActive: false },
    { name: 'Services', isActive: false },
    { name: 'About', isActive: false },
    { name: 'Pricing', isActive: false },
    { name: 'Contact', isActive: false }
  ];

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-content">
          <h1 className="brand-text">WELLDONE</h1>
          <button className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </button>
        </div>
      </nav>
      
      {isMenuOpen && (
        <div className="dropdown-menu">
          <div className="menu-content">
            {menuItems.map((item, index) => (
              <a 
                key={index} 
                href="#" 
                className={`menu-item ${item.isActive ? 'active' : ''}`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
      
      <main className="main-content">
        <h1>Hello World</h1>
      </main>
    </div>
  );
}

export default App;
