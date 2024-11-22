import { useState } from "react";
import { ethers } from "ethers";

function WalletConnect() {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  async function connectWallet() {
    if (!connected) {
      // Проверяем, что window.ethereum доступен
      if (typeof window.ethereum !== "undefined") {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          // Проверяем, что хотя бы один аккаунт доступен
          if (accounts.length > 0) {
            console.log("Accounts found:", accounts);

            // Получаем аккаунт
            const account = accounts[0];
            setWalletAddress(account);

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const _walletAddress = await signer.getAddress();

            console.log("Signer address:", _walletAddress);

            setConnected(true);
            setWalletAddress(_walletAddress);
          } else {
            console.error("No accounts found.");
          }
        } catch (error) {
          console.error("Error connecting wallet:", error);
        }
      } else {
        console.error(
          "MetaMask is not installed. Please install MetaMask and try again."
        );
        //alert('MetaMask is not installed. Please install MetaMask and try again.');
      }
    } else {
      setConnected(false);
      setWalletAddress("");
    }
  }

  return (
    <div className="walletConnect">
      <div className="main">
        <div className="content">
          <button className="btn" onClick={connectWallet}>
            {connected ? "Disconnect Wallet" : "Connect Wallet"}
          </button>
          <h3>Address</h3>
          <h4 className="wal-add">{walletAddress}</h4>
        </div>
      </div>
    </div>
  );
}

export default WalletConnect;
