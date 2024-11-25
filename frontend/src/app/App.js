// src/app/App.js
import React from 'react';
import HomePage from '../pages/HomePage';
import HeaderComponent from '../widgets/HeaderComponent';
import styles from '../App.css'; 
import FooterComponent from '../widgets/FooterComponent';

function App() {
  return (
    <div className='wrapper'>
      <div className='header_wrapper'>
        <HeaderComponent />
      </div>
      <div className='content'>
      <div className='main_container'>
        <div className='container'>
          <HomePage />
        </div>
      </div>
      </div>
      <div className='footer_wrapper'>
        <FooterComponent />
      </div>
    </div>
  );
}

export default App;
