import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ABI from '../../GmxAbi.json';

const PROVIDER_URL = 'https://eth.drpc.org';
const ADDRESS = '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a';
const provider = ethers.getDefaultProvider(PROVIDER_URL);

const gmxContract = new ethers.Contract(ADDRESS, ABI, provider);

const BlockchainData = () => {
  const [blockNumber, setBlockNumber] = useState(null);

  // Функция для получения номера блока
  const getEthPrice = async () => {
    try {
      const result = await provider.getBlockNumber(); // Получаем номер блока
      setBlockNumber(result); // Устанавливаем его в состояние
    } catch (error) {
      console.error("Ошибка получения номера блока:", error);
    }
  };

  useEffect(() => {
    getEthPrice(); // Вызываем функцию при монтировании компонента
  }, []);

  return (
    <div>
      <h3>Текущий номер блока:</h3>
      {blockNumber !== null ? (
        <div>{blockNumber}</div>
      ) : (
        <div>Загрузка...</div>
      )}
    </div>
  );
};

export default BlockchainData;
