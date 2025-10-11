import React, { useState } from 'react';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsClosing(false);
      }, 300); // Match animation duration
    } else {
      setIsMenuOpen(true);
    }
  };

  // Prevent scrolling when menu is open
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

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
        <div className={`dropdown-menu ${isClosing ? 'closing' : ''}`}>
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
