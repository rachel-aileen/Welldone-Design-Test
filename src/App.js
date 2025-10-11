import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-content">
          <h1 className="brand-text">WELLDONE</h1>
          <button className="hamburger-menu">
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </button>
        </div>
      </nav>
      <main className="main-content">
        <h1>Hello World</h1>
      </main>
    </div>
  );
}

export default App;
