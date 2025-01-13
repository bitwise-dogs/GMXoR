// src/app/App.js
import React, { useState, useEffect } from 'react';
import WalletConnect from '../features/wallet/WalletConnect';

function HeaderComponent() {

  const currentTheme = localStorage.getItem('theme') || 'dark';
  const [theme, setTheme] = useState(currentTheme);

  const changeTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="header">
        <WalletConnect />
        <div className='toggle_theme' onClick={changeTheme}>
          {theme === 'light' ? 
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 48 48">
              <mask id="ipSMoon0"><path fill="#fff" stroke="#fff" stroke-linejoin="round" stroke-width="4" d="M28.053 4.41c-5.47 1.427-9.508 6.4-9.508 12.317c0 7.03 5.699 12.727 12.728 12.727c5.916 0 10.89-4.037 12.316-9.507A20.05 20.05 0 0 1 44 24c0 11.046-8.954 20-20 20S4 35.046 4 24S12.954 4 24 4c1.389 0 2.744.141 4.053.41Z"/></mask>
              <path fill="#accccc" d="M0 0h48v48H0z" mask="url(#ipSMoon0)"/>
            </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
                <path fill="#7cb4b4" d="M120 40v-8a8 8 0 0 1 16 0v8a8 8 0 0 1-16 0Zm8 24a64 64 0 1 0 64 64a64.07 64.07 0 0 0-64-64Zm-69.66 5.66a8 8 0 0 0 11.32-11.32l-8-8a8 8 0 0 0-11.32 11.32Zm0 116.68l-8 8a8 8 0 0 0 11.32 11.32l8-8a8 8 0 0 0-11.32-11.32ZM192 72a8 8 0 0 0 5.66-2.34l8-8a8 8 0 0 0-11.32-11.32l-8 8A8 8 0 0 0 192 72Zm5.66 114.34a8 8 0 0 0-11.32 11.32l8 8a8 8 0 0 0 11.32-11.32ZM40 120h-8a8 8 0 0 0 0 16h8a8 8 0 0 0 0-16Zm88 88a8 8 0 0 0-8 8v8a8 8 0 0 0 16 0v-8a8 8 0 0 0-8-8Zm96-88h-8a8 8 0 0 0 0 16h8a8 8 0 0 0 0-16Z"/>
            </svg>}
        </div>
    </div>
  );
}

export default HeaderComponent;
