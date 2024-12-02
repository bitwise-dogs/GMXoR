import React from "react";

import { LineChart } from "@mui/x-charts";

const Chart = (props) => {
  return (
    <LineChart
      xAxis={[{ data: props.xAxis }]}
      series={[
        {
          data: props.series,
        },
      ]}
      width={300}
      height={200}
      margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
      grid={{ vertical: true, horizontal: true }}
    />
  );
};

export default Chart;
