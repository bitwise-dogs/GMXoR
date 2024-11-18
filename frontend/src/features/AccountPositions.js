import React, { useEffect, useState } from "react";
import contract from "../shared/contracts/readerContract";
import { ethers } from "ethers";
import Position from "../shared/AccountUnits/Position";

function AccountPositions(props) {
  const [positionsDataRaw, setPositionsDataRaw] = useState([]);
  const [positions, setPositions] = useState([[]]);
  var positionsDataFormatted = [];
  var datastore = props.datastore;
  var account = props.account;

  const resultPositions = positions.map((element, index) => {
    return <Position key={index} element={element} index={index} />;
  });

  const fetchContractData = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const _walletAddress = await signer.getAddress();

      const start = 0;
      const end = 10;
      const data = await contract.getAccountPositions(
        datastore,
        account,
        start,
        end
      );

      setPositionsDataRaw(data);
    } catch (error) {
      console.error("Ошибка вызова контракта:", error);
    }
  };

  useEffect(() => {
    fetchContractData();
  }, [account]);

  useEffect(() => {
    (async () => {
      if (positionsDataRaw) {
        for (let i = 0; i < positionsDataRaw.length; i++) {
          positionsDataFormatted.push([]);

          let balance = positionsDataRaw[i][1][0].toString();
          positionsDataFormatted[i].push(
            balance.slice(0, -30) + "." + balance.slice(-30, -28) + "  $"
          );

          if (positionsDataRaw[0][2][0] == false) {
            positionsDataFormatted[i].push("short");
          } else {
            positionsDataFormatted[i].push("long");
          }
        }
      }
    })();
  }, [positionsDataRaw]);

  useEffect(() => {
    (async () => {
      if (positionsDataFormatted.length > 0) {
        let positions_copy = [];
        positionsDataFormatted.forEach((el) => {
          positions_copy.push(el);
        });
        setPositions(positions_copy);
      }
    })();
  }, [positionsDataFormatted]);

  return (
    <div>
      <h2>Открытые позиции</h2>
      {positionsDataRaw ? <ol>{resultPositions}</ol> : <p>Загрузка...</p>}
    </div>
  );
}

export default AccountPositions;
/**
 * Вывод функции getAccountPosition:
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
