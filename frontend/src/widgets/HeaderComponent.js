// src/app/App.js
import React from 'react';
import WalletConnect from '../features/wallet/WalletConnect';

function HeaderComponent() {
  return (
    <div className="header_wrapper">
        <WalletConnect />
    </div>
  );
}

export default HeaderComponent;
