import React, { useEffect, useState } from "react";
import Chart from "../shared/AccountUnits/Chart";
import { formatPnl } from "../shared/scripts/StringFormatting";

function AccountGenerals(props) {
  let xAxis = [1, 2, 3, 5, 8, 10];
  let series1 = [2, 5.5, 2, 8.5, 1.5, 5];
  let series2 = [8, 5, 1, 3, 1, 6];
  const [curAvgPnl, setCurAvgPnl] = useState("");

  useEffect(() => {
    let avgPnl = props.averagePNL?.[props.averagePNL.length - 1]?.toString();

    const isCurrent = true;
    if (avgPnl !== undefined) {
      setCurAvgPnl(formatPnl(avgPnl, isCurrent));
    }
  }, [props.averagePNL]);
  return (
    <div className="block">
      <h2>General</h2>
      <p>
        <u>GMX V2 Arbitrum</u> information for account <b>{props.account}</b>
      </p>

      <div>
        <h3> Account metrics: </h3>
        <ul>
          <li> CUR AVG PNL: {curAvgPnl}</li>
          <li> CUR AVG MARK PRICE: {props.averageMarkPrice.length > 0 ? '$'+props.averageMarkPrice[props.averageMarkPrice.length-1].toString().slice(0,-9) : ''}</li>
        </ul>
      </div>
      <div className="charts">
        <Chart
          xAxis={props.averagePNLxAxis}
          series={props.averagePNL}
          label={"Mean Position Pnl"}
        />
        <Chart
          xAxis={props.averagePNLxAxis}
          series={props.averageMarkPrice}
          label={"Mean Mark Price"}
        />
      </div>
    </div>
  );
}

export default AccountGenerals;
