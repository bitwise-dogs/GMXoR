// src/app/App.js
import React from 'react';
import WalletConnect from '../features/wallet/WalletConnect';

function HeaderComponent() {
  return (
    <div className="header">
        <WalletConnect />
    </div>
  );
}

export default HeaderComponent;
