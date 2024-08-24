import { axisClasses, BarChart, barElementClasses } from "@mui/x-charts";
import { DatasetType } from "@mui/x-charts/internals";

const colors: string[] = ["#2F4CDD", "#B519EC"];
const otherSetting = {
  height: 300,
  grid: { horizontal: true },
  // colors: colors,
  sx: {
    [`.${barElementClasses.root}`]: {
      fill: "#3498DB",
      // strokeWidth: 1,
    },
    [`.MuiBarElement-series-l_id`]: {
      stroke: colors[1],
    },
    [`.MuiBarElement-series-r_id`]: {
      stroke: colors[1],
    },
    [`.${axisClasses.root}`]: {
      [`.${axisClasses.tick}, .${axisClasses.line}`]: {
        stroke: "#FFFFFF",
        strokeWidth: 1,
      },
      [`.${axisClasses.tickLabel}`]: {
        fill: "#899BB0",
      },
    },
  },
};

const valueFormatter = (value: number | null) => `$${value}`;
const failureRateValueFormatter = (value: number | null) => `${value}%`;

const TrendBarChart = ({
  data,
  xAxisDataKey,
  yAxisDataKey,
}: {
  data: DatasetType;
  xAxisDataKey: string;
  yAxisDataKey: string;
}) => {
  return (
    <BarChart
      dataset={data}
      xAxis={[
        {
          scaleType: "band",
          dataKey: xAxisDataKey,
          valueFormatter: (month, context) => {
            const dateObj = new Date(month);
            return context.location === "tick"
              ? `${dateObj
                  .toLocaleString("en-us", { month: "short" })
                  .slice(
                    0,
                    3
                  )}, ${dateObj.getDate()} \n${dateObj.getFullYear()}`
              : `${dateObj.toLocaleString("en-us", {
                  month: "short",
                })}, ${dateObj.getDate()} ${dateObj.getFullYear()}`;
          },
        },
      ]}
      colors={colors}
      series={[
        {
          dataKey: yAxisDataKey,
          valueFormatter: valueFormatter,
        },
      ]}
      slotProps={{ legend: { hidden: true } }}
      yAxis={[
        {
          valueFormatter: (value) => `${value}%`,
        },
      ]}
      {...otherSetting}
    />
  );
};

export default TrendBarChart;
