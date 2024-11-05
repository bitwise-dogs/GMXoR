// src/shared/contract.js
import { ethers } from 'ethers';
import provider from '../provider';  // Импорт провайдера
import ABI from '../ABI/GmxAbi.json';  // Импорт ABI контракта

// Адрес контракта GMX
const ADDRESS = '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a';

// Создаем контракт с использованием провайдера
const gmxContract = new ethers.Contract(ADDRESS, ABI, provider);
// Экспортируем контракт для использования в других компонентах
export default gmxContract;
