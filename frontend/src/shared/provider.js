import { ethers } from 'ethers';

const provider = typeof window !== "undefined" && window.ethereum
  ? new ethers.BrowserProvider(window.ethereum)
  : null;

export default provider;
