// src/pages/HomePage.js
import React from 'react';
import WalletConnect from '../features/wallet/WalletConnect';
import AccountPositions from '../features/AccountPositions'
const HomePage = () => {
  return (
    <div>
      <h1>GMX Analytics</h1>
      <WalletConnect />
      <AccountPositions />
    </div>
  );
};

export default HomePage;
