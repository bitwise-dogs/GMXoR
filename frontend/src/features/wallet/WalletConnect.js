import { useState } from 'react';
import {ethers} from 'ethers'
import Button from '@mui/material/Button';

function WalletConnect() {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  async function connectWallet() {
    if (!connected) {
      // Проверяем, что window.ethereum доступен
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Проверяем, что хотя бы один аккаунт доступен
          if (accounts.length > 0) {
            console.log("Accounts found:", accounts);

            // Получаем аккаунт
            const account = accounts[0];
            setWalletAddress(account);

            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner();
            const _walletAddress = await signer.getAddress();
            

            console.log("Signer address:", _walletAddress);

            setConnected(true);
            setWalletAddress(_walletAddress);
          } else {
            console.error('No accounts found.');
          }
        } catch (error) {
          console.error('Error connecting wallet:', error);
        }
      } else {
        console.error('MetaMask is not installed. Please install MetaMask and try again.');
        alert('MetaMask is not installed. Please install MetaMask and try again.');
      }
    } else {

      setConnected(false);
      setWalletAddress("");
    }
  }

  return (
    <div className='header_content'>
      <h2>GMX Analytics</h2>
      <h4 className="wal-add">{walletAddress}</h4>
      <Button className="btn" onClick={connectWallet} variant="outlined" color='#e7e7ec'>
        {connected ? "Disconnect Wallet" : "Connect Wallet"}
      </Button>
    </div>
  );
}

export default WalletConnect;
