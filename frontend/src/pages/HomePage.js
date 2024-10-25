// src/pages/HomePage.js
import React from 'react';
import WalletConnect from '../features/wallet/WalletConnect';

const HomePage = () => {
  return (
    <div>
      <h1>GMX Analytics</h1>
      <WalletConnect />
    </div>
  );
};

export default HomePage;
