// src/pages/HomePage.js
import React from 'react';
import WalletConnect from '../features/wallet/WalletConnect';
import UserAnalytics from '../widgets/UserAnalytics';
const HomePage = () => {
  return (
    <div>
      <h1>GMX Analytics</h1>
      <WalletConnect />
      <UserAnalytics />
    </div>
  );
};

export default HomePage;
