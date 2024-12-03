import React, { useEffect, useState } from "react";
import contract from "../shared/contracts/readerContract";
import Position from "../shared/AccountUnits/Position";
import getTokenName from "../shared/scripts/getTokenName";
import axios from "axios";
import getAveragePNL from "../shared/scripts/getAveragePNL";
import {
  formatPnl,
  formatPrice,
  formatRawPrice,
} from "../shared/scripts/StringFormatting";
import Chart from "../shared/AccountUnits/Chart";

function AccountPositions(props) {
  const [positionsDataRaw, setPositionsDataRaw] = useState(null);
  const [updPositionsDataRaw, setUpdPositionsDataRaw] = useState(null);
  const [positions, setPositions] = useState([[]]);
  const [tokensNames, setTokensNames] = useState(null);
  const [averagePNL, setAveragePNL] = useState([]);
  const [averagePNLxAxis, setAveragePNLxAxis] = useState([]);

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
    axios
      .get(`http://127.0.0.1:8000/getPositionsData/${account}`)
      .then((response) => {
        setUpdPositionsDataRaw(response);
      });
  }, [account]);

  useEffect(() => {
    console.log(updPositionsDataRaw);
    if (positions && updPositionsDataRaw) {
      let positions_copy = [];
      let position_copy = [];
      for (let i = 0; i < positions.length; i++) {
        position_copy = positions[i].slice();

        position_copy[3] = formatPnl(
          updPositionsDataRaw["data"][i]["percent_profit"].toString()
        );

        position_copy[4] = formatPrice(
          updPositionsDataRaw["data"][i]["entry_price"].toString()
        );
        position_copy[5] = formatPrice(
          updPositionsDataRaw["data"][i]["mark_price"].toString()
        );
        positions_copy.push(position_copy);
      }
      setPositions(positions_copy);
    }
  }, [updPositionsDataRaw]);

  useEffect(() => {
    if (updPositionsDataRaw) {
      let averagePNL_copy = averagePNL.slice();
      averagePNL_copy.push(
        getAveragePNL(updPositionsDataRaw, positions.length)
      );
      setAveragePNL(averagePNL_copy);

      let averagePNLxAxis_copy = averagePNLxAxis.slice();
      averagePNLxAxis_copy.push(averagePNL.length);
      setAveragePNLxAxis(averagePNLxAxis_copy);
    }
    const timeoutId = setTimeout(() => {
      axios
        .get(`http://127.0.0.1:8000/getPositionsData/${account}`)
        .then((response) => {
          setUpdPositionsDataRaw(response);
        });
    }, 4000);
  }, [updPositionsDataRaw]);

  useEffect(() => {
    (async () => {
      if (positionsDataRaw) {
        for (let i = 0; i < positionsDataRaw.length; i++) {
          positionsDataFormatted.push([]);

          let balance = positionsDataRaw[i][1][0].toString();
          positionsDataFormatted[i].push(formatRawPrice(balance));

          if (positionsDataRaw[0][2][0] === false) {
            positionsDataFormatted[i].push("SHORT");
          } else {
            positionsDataFormatted[i].push("LONG");
          }

          positionsDataFormatted[i].push("Загрузка...");
          positionsDataFormatted[i].push("Загрузка...");
          positionsDataFormatted[i].push("Загрузка...");
          positionsDataFormatted[i].push("Загрузка...");
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
    <div className="block">
      <h2>Open positions</h2>
      <Chart xAxis={averagePNLxAxis} series={averagePNL} />
      {/* {updPositionsDataRaw ? (
        <div>
          PnL нулевой позиции (Base PnL in USD):{" "}
          {updPositionsDataRaw["data"]["0"]["basePnlUsd"]}
        </div>
      ) : (
        <p>Загрузка...</p>
      )} */}
      {positionsDataRaw ? (
        <table className="table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Size</th>
              <th>PnL</th>
              <th>Entry price</th>
              <th>Mark price</th>
            </tr>
          </thead>
          <tbody>{resultPositions}</tbody>
        </table>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
}

export default AccountPositions;
