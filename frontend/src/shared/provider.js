// src/shared/provider.js
import { ethers } from 'ethers';

// URL RPC провайдера
//const PROVIDER_URL = 'https://eth.drpc.org';

// Создаем и экспортируем провайдера для использования в других модулях
const provider = new ethers.BrowserProvider(window.ethereum);

export default provider;