import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => {
    // Get page from URL hash, default to 'Home'
    const hash = window.location.hash.slice(1);
    return hash || 'Home';
  });
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [showPage, setShowPage] = useState(true);
  const [nextPage, setNextPage] = useState(() => {
    const hash = window.location.hash.slice(1);
    return hash || 'Home';
  });

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsClosing(false);
      }, 400); // Match animation duration
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

  // Handle browser back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      const pageName = hash || 'Home';
      if (pageName !== currentPage) {
        setCurrentPage(pageName);
        setNextPage(pageName);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPage]);

  const menuItems = [
    { name: 'Home', isActive: nextPage === 'Home' },
    { name: 'Work', isActive: nextPage === 'Work' },
    { name: 'Process', isActive: nextPage === 'Process' },
    { name: 'Pricing', isActive: nextPage === 'Pricing' },
    { name: 'Contact', isActive: nextPage === 'Contact' }
  ];

  const handleMenuClick = (pageName) => {
    if (pageName !== currentPage) {
      // Update page immediately
      setCurrentPage(pageName);
      setNextPage(pageName);
      
      // Update URL hash to maintain state on refresh
      window.location.hash = pageName;
    }
    
    // Close menu immediately with animation
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 400);
  };

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
        <div className={`dropdown-menu ${isClosing ? 'closing' : 'show'}`}>
          <div className="menu-content">
            {menuItems.map((item, index) => (
              <button 
                key={index} 
                className={`menu-item ${item.isActive ? 'active' : ''}`}
                onClick={() => handleMenuClick(item.name)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <main className="main-content">
        {currentPage === 'Home' && (
          <div className={`page-content ${showPage ? 'fade-in' : 'fade-out'}`}>
            <h1>Hello World</h1>
          </div>
        )}
        {currentPage === 'Pricing' && (
          <div className={`pricing-page page-content ${showPage ? 'fade-in' : 'fade-out'}`}>
            <div className="pricing-content">
              <h1 className="transparency-text">We believe in transparency.</h1>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
