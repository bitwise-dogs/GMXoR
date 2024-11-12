import React, { useEffect, useState } from "react";
import contract from "../shared/contracts/readerContract";
import {ethers} from 'ethers'

const ActivePositions = () => {
  const [result, setResult] = useState(null);
  const [positions, setPositions] = useState([[]]);
  var positionsData = [];  

  const resultPositions =   
    positions.map((element, index) => {
      return <p key={index}>{element[1] + " position - " + element[0]}</p>;
    }
  );

  const fetchContractData = async () => {

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });  //аккаунты юзера (проверка через MetaMask)
      const provider = new ethers.BrowserProvider(window.ethereum)
      const userAccount = accounts[0]; 
      const signer = await provider.getSigner()
      const _walletAddress = await signer.getAddress(); 



      const datastore = '0xFD70de6b91282D8017aA4E741e9Ae325CAb992d8'  
      const account = '0x591b6F096281DD7b645767C96aC34863A4Df9a89' //На проде юзать _walletAddress. Это акк левого чела, у которого есть открытые позиции
      const start = 0 
      const end = 10 
      const data = await contract.getAccountPositions(datastore, account, start, end);

    /**
     * Вывод функции getAccountPositions:
     *
     * Каждая позиция включает следующие компоненты:
     *
     * 1. **addresses**: 
     *    - **account**: Адрес аккаунта, владеющего позицией.
     *    - **market**: Адрес рынка, на котором открыта позиция.
     *    - **collateralToken**: Адрес токена, используемого в качестве залога для позиции.
     *
     * 2. **numbers**: 
     *    - **sizeInUsd**: Размер позиции в долларах.
     *    - **sizeInTokens**: Размер позиции в токенах.
     *    - **collateralAmount**: Сумма залога, используемого для данной позиции.
     *    - **borrowingFactor**: Фактор займа, указывающий, сколько можно занять против залога.
     *    - **fundingFeeAmountPerSize**: Сумма комиссии за финансирование на единицу размера позиции.
     *    - **longTokenClaimableFundingAmountPerSize**: Сумма, которую можно получить по длинной позиции.
     *    - **shortTokenClaimableFundingAmountPerSize**: Сумма, которую можно получить по короткой позиции.
     *    - **increasedAtBlock**: Блок, в котором была увеличена позиция.
     *    - **decreasedAtBlock**: Блок, в котором была уменьшена позиция.
     *    - **increasedAtTime**: Время увеличения позиции (в формате Unix timestamp).
     *    - **decreasedAtTime**: Время уменьшения позиции (в формате Unix timestamp).
     *
     * 3. **flags**:
     *    - **isLong**: Указывает, является ли позиция длинной (true) или короткой (false). 
     *
     * Эти данные могут быть использованы для анализа позиций аккаунта на конкретном рынке 
     * и для отображения информации о позиции на пользовательском интерфейсе.
     */

      setResult(data);
      
    } catch (error) {
      console.error("Ошибка вызова контракта:", error);
    }
    
  };

  useEffect(() => {
    fetchContractData();
  }, []);

  useEffect(() => {
    (async () => {
      if(result){
        for(let i=0; i<result.length; i++){
          positionsData.push([]);

            let balance = result[i][1][0].toString();
            positionsData[i].push(balance.slice(0,-30) + "." + balance.slice(-30, -28)  + "  $");

            if(result[0][2][0]==false){
              positionsData[i].push("short");
            } else{
              positionsData[i].push("long");
            }
        }
      }
    })()
  }, [result]);

  useEffect(() => {
    (async () => {
      if(positionsData.length > 0){
        let positions_copy = [];
        positionsData.forEach(el => {
          positions_copy.push(el);
        });
        setPositions(positions_copy);
      }
    })()
  }, [positionsData]);


  return (
    <div>
      <h2>Открытые позиции</h2>
      <div>{resultPositions}</div>
    </div>
  );
};

export default ActivePositions;
