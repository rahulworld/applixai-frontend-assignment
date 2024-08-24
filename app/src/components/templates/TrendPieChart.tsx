import { pieArcLabelClasses, PieChart } from "@mui/x-charts";

const colors = [
  "#1ABC9C", // Teal
  "#E67E22", // Orange
  "#3498DB",
  "#7FDBFF",
];

const TrendPieChart = ({ data }: { data: [] }) => {
  return (
    <PieChart
      colors={colors}
      series={[
        {
          data: data,
          arcLabel: (item) =>
            `${item.label == "none" ? "Best" : item.label} (${item.value})`,
          arcLabelMinAngle: 45,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: "#FFFFFF",
          fontSize: 12,
          fontStyle: "italic",
        },
      }}
      slotProps={{ legend: { hidden: true } }}
      height={200}
      margin={{ right: 5, left: 5 }}
    />
  );
};

export default TrendPieChart;
