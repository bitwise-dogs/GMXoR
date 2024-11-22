// src/app/App.js
import React from 'react';
import HomePage from '../pages/HomePage';
import HeaderComponent from '../widgets/HeaderComponent';
import styles from '../App.css'; 

function App() {
  return (
    <div className='main_container'>
      <div className='container'>
        <HeaderComponent />
        <HomePage />
      </div>
    </div>
  );
}

export default App;
