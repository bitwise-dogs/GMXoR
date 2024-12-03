import React from "react";

import { LineChart } from "@mui/x-charts";

const Chart = (props) => {
  return (
    <LineChart
      sx={{
        "& .MuiChartsAxis-tick, .MuiChartsAxis-line": {
          stroke: "#ffffff !important",
          strokeWidth: 1,
        },
        "& .MuiChartsAxis-tickLabel": {
          fill: "#ffffff !important",
          fontSize: "12px",
        },
      }}
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
