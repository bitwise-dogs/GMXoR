import React from "react";

import { LineChart } from "@mui/x-charts";

const Chart = (props) => {
  return (
    <LineChart
      xAxis={[
        {
          data: props.xAxis,
          label: props.label,
          labelStyle: {
            fontSize: "14px",
            fill: "#ffffff",
          },
        },
      ]}
      sx={{
        "& .MuiChartsAxis-tick, .MuiChartsAxis-line": {
          stroke: "#ffffff",
          strokeWidth: 1,
        },
      }}
      series={[
        {
          data: props.series,
        },
      ]}
      width={300}
      height={220}
      margin={{ left: 30, right: 30, top: 30, bottom: 50 }}
      grid={{ vertical: true, horizontal: true }}
    />
  );
};

export default Chart;
