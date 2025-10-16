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
  const [selectedPages, setSelectedPages] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState({
    'Blog/Newsletter': false,
    'Payments': false,
    'Scheduling': false
  });
  const [selectedServices, setSelectedServices] = useState({
    'Branding': false,
    'Copywriting': false,
    'Logo Design': false
  });
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  // Clear form when leaving Pricing page
  useEffect(() => {
    if (currentPage !== 'Pricing') {
      setSelectedPages('');
      setSelectedFeatures({
        'Blog/Newsletter': false,
        'Payments': false,
        'Scheduling': false
      });
      setSelectedServices({
        'Branding': false,
        'Copywriting': false,
        'Logo Design': false
      });
      setIsDropdownOpen(false);
    }
  }, [currentPage]);

  // Handle scroll-based navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setNavbarVisible(false);
      } else {
        // Scrolling up
        setNavbarVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

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

  const handleBrandClick = () => {
    // Navigate to Home page
    setCurrentPage('Home');
    setNextPage('Home');
    window.location.hash = 'Home';
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (value) => {
    setSelectedPages(value);
    setIsDropdownOpen(false);
  };

  const handleFeatureToggle = (feature) => {
    setSelectedFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  const handleServiceToggle = (service) => {
    setSelectedServices(prev => ({
      ...prev,
      [service]: !prev[service]
    }));
  };

  return (
    <div className="App">
      <nav className={`navbar ${navbarVisible ? 'visible' : 'hidden'}`}>
        <div className="navbar-content">
          <h1 className="brand-text" onClick={handleBrandClick}>WELLDONE</h1>
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
              <h3 className="price-estimate-text">Want a price estimate?</h3>
              <p className="disclaimer-text">Get one below. Please note this is only a ballpark cost and does not reflect the final cost.</p>
              
              <div className="form-section">
                      <p className="form-question">
                        <img src="https://firebasestorage.googleapis.com/v0/b/rancho-mobile-vet.appspot.com/o/star%20(1).png?alt=media&token=0e377fd5-099a-44e3-831c-30e07ce75d4e" alt="Required" className="required-star" />
                        How many pages will your website have?
                      </p>
                <div className="custom-dropdown-container">
                  <div className="custom-dropdown">
                    <div className="dropdown-selected" onClick={handleDropdownToggle}>
                      {selectedPages || <span style={{opacity: 0}}>1</span>}
                    </div>
                    {isDropdownOpen && (
                      <div className="dropdown-options">
                        <div className="dropdown-option" onClick={() => handleOptionSelect('')}></div>
                        <div className="dropdown-option" onClick={() => handleOptionSelect('1')}>1</div>
                        <div className="dropdown-option" onClick={() => handleOptionSelect('2')}>2</div>
                        <div className="dropdown-option" onClick={() => handleOptionSelect('3')}>3</div>
                        <div className="dropdown-option" onClick={() => handleOptionSelect('4')}>4</div>
                        <div className="dropdown-option" onClick={() => handleOptionSelect('5')}>5</div>
                        <div className="dropdown-option" onClick={() => handleOptionSelect('6')}>6</div>
                        <div className="dropdown-option" onClick={() => handleOptionSelect('7')}>7</div>
                        <div className="dropdown-option" onClick={() => handleOptionSelect('8')}>8</div>
                        <div className="dropdown-option" onClick={() => handleOptionSelect('9')}>9</div>
                        <div className="dropdown-option" onClick={() => handleOptionSelect('10+')}>10+</div>
                      </div>
                    )}
                    <div className="dropdown-icon" onClick={handleDropdownToggle}>▼</div>
                  </div>
                </div>

                <div className="features-section">
                  <p className="features-question">
                    <img src="https://firebasestorage.googleapis.com/v0/b/rancho-mobile-vet.appspot.com/o/star%20(1).png?alt=media&token=0e377fd5-099a-44e3-831c-30e07ce75d4e" alt="Required" className="required-star" />
                    Select all features you'd like:
                  </p>
                  <div className="checkbox-group">
                    {Object.keys(selectedFeatures).map((feature) => (
                      <label key={feature} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={selectedFeatures[feature]}
                          onChange={() => handleFeatureToggle(feature)}
                          className="checkbox-input"
                        />
                        <span className="checkbox-custom"></span>
                        <span className="checkbox-text">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="services-section">
                  <p className="services-question">
                    <img src="https://firebasestorage.googleapis.com/v0/b/rancho-mobile-vet.appspot.com/o/star%20(1).png?alt=media&token=0e377fd5-099a-44e3-831c-30e07ce75d4e" alt="Required" className="required-star" />
                    Select any additional services you'd like:
                  </p>
                  <div className="checkbox-group">
                    {Object.keys(selectedServices).map((service) => (
                      <label key={service} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={selectedServices[service]}
                          onChange={() => handleServiceToggle(service)}
                          className="checkbox-input"
                        />
                        <span className="checkbox-custom"></span>
                        <span className="checkbox-text">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
