import React, { useEffect, useState } from "react";
import contract from "../shared/contracts/readerContract";
import { ethers } from "ethers";
import Chart from "../shared/AccountUnits/Chart";

function AccountGenerals(props) {
  let xAxis = [1, 2, 3, 5, 8, 10];
  let series1 = [2, 5.5, 2, 8.5, 1.5, 5];
  let series2 = [8, 5, 1, 3, 1, 6];

  return (
    <div className="block">
      <h2>General</h2>
      <p>
        <u>GMX V2 Arbitrum</u> information for account <b>{props.account}</b>
      </p>
      <div className="charts">
        <Chart xAxis={xAxis} series={series1} />
        <Chart xAxis={xAxis} series={series2} />
        <Chart xAxis={xAxis} series={series1} />
      </div>
    </div>
  );
}

export default AccountGenerals;
