import {
  axisClasses,
  barElementClasses,
  LineChart,
  useDrawingArea,
} from "@mui/x-charts";
import { DatasetType } from "@mui/x-charts/internals";

// const colors: string[] = ['#FFFFFF', '#FFFFFF'];
const colors: string[] = ["#2F4CDD", "#B519EC"];
const otherSetting = {
  height: 300,
  grid: { horizontal: true },
  sx: {
    [`.${barElementClasses.root}`]: {
      fill: "#ffffff",
      strokeWidth: 2,
    },
    [`.MuiBarElement-series-l_id`]: {
      stroke: colors[0],
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
        fill: "#FFFFFF",
      },
    },
  },
};

const valueFormatter = (value: number | null) => `$${value}`;
const failureRateValueFormatter = (value: number | null) => `${value}%`;

const Colorswitch = () => {
  const { top, height, bottom } = useDrawingArea();
  const svgHeight = top + bottom + height;

  return (
    <>
      <defs>
        <linearGradient
          id="paint0_linear_45_2"
          x1="300.25"
          y1="46.9999"
          x2="300.25"
          y2={`${svgHeight}px`}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2F4CDD" stopOpacity="0.4" />
          <stop offset="1" stopColor="#2F4CDD" stopOpacity="0" />
        </linearGradient>
      </defs>

      <defs>
        <linearGradient
          id="paint0_linear_45_3"
          x1="299.498"
          y1="-4.28272"
          x2="299.498"
          y2={`${svgHeight}px`}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B519EC" stopOpacity="0.4" />
          <stop offset="1" stopColor="#B519EC" stopOpacity="0" />
        </linearGradient>
      </defs>
    </>
  );
};

const TrendLineChart = ({
  data,
  xAxisDataKey,
  yAxisDataKey,
}: {
  data: DatasetType;
  xAxisDataKey: string;
  yAxisDataKey: string;
}) => {
  return (
    <LineChart
      className="w-full"
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
      series={[
        {
          dataKey: yAxisDataKey,
          area: true,
          baseline: "min",
          valueFormatter: failureRateValueFormatter,
        },
      ]}
      slotProps={{ legend: { hidden: true } }}
      yAxis={[
        {
          valueFormatter: (value) => `${value}%`,
          label: "Rate",
        },
      ]}
      grid={{ horizontal: true }}
      sx={{
        [`.${axisClasses.root}`]: {
          [`.${axisClasses.tick}, .${axisClasses.line}`]: {
            stroke: "#FFFFFF",
            strokeWidth: 1,
          },
          [`.${axisClasses.tickLabel}`]: {
            fill: "#899BB0",
          },
        },
        ".css-j6h5qe-MuiAreaElement-root": {
          fill: "url(#paint0_linear_45_2)",
        },
        ".css-tvglr0-MuiAreaElement-root": {
          fill: "url(#paint0_linear_45_3)",
        },
      }}
      colors={["#2F4CDD", "#B519EC"]}
    >
      <Colorswitch />
    </LineChart>
  );
};

export default TrendLineChart;
