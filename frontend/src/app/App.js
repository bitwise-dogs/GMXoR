// src/app/App.js
import React from 'react';
import HomePage from '../pages/HomePage';
import HeaderComponent from '../widgets/HeaderComponent';
import styles from '../App.css'; 

function App() {
  return (
    <div>
      <div className='header_wrapper'>
        <HeaderComponent />
      </div>
      <div className='main_container'>
        <div className='container'>
          {/* <HeaderComponent /> */}
          <HomePage />
          <HomePage />
          <HomePage />
          <HomePage />
        </div>
      </div>
    </div>
  );
}

export default App;
