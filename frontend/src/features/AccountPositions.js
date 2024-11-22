import React, { useEffect, useState } from "react";
import contract from "../shared/contracts/readerContract";
import { ethers } from "ethers";
import Position from "../shared/AccountUnits/Position";
import getTokenName from "../shared/scripts/getTokenName";

function AccountPositions(props) {
  const [positionsDataRaw, setPositionsDataRaw] = useState(null);
  const [positions, setPositions] = useState([[]]);
  const [tokensNames, setTokensNames] = useState(null);

  let positionsDataFormatted = [];
  let datastore = props.datastore;
  let account = props.account;

  const resultPositions = positions.map((element, index) => {
    return <Position key={index} element={element} index={index} />;
  });

  const fetchAccountPositions = async () => {
    try {
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
    fetchAccountPositions();
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

          positionsDataFormatted[i].push("");
        }
      }
    })();
  }, [positionsDataRaw]);

  useEffect(() => {
    (async () => {
      if (positionsDataRaw) {
        let tokensNamesCopy = [];
        for (let i = 0; i < positionsDataRaw.length; i++) {
          tokensNamesCopy.push(await getTokenName(positionsDataRaw[i][0][1]));
        }
        setTokensNames(tokensNamesCopy);
      }
    })();
  }, [positionsDataRaw]);

  useEffect(() => {
    (() => {
      if (tokensNames) {
        if (positions) {
          let positions_copy = [];
          let position_copy = [];

          for (let i = 0; i < positions.length; i++) {
            position_copy = positions[i].slice();
            position_copy[2] = tokensNames[i];
            positions_copy.push(position_copy);
          }

          setPositions(positions_copy);
        }
      }
    })();
  }, [tokensNames]);

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
