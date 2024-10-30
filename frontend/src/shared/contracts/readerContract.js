import { ethers } from 'ethers';
import provider from '../provider';  // Импорт провайдера
import reader from '../../ABIs/ReaderAbi.json'
 

const ADDRESS = reader.address;
const ABI = reader.abi;
// Создаем контракт с использованием провайдера
const readerContract = new ethers.Contract(ADDRESS, ABI, provider);

// Экспортируем контракт для использования в других компонентах
export default readerContract;
