import { MouseEventHandler } from "react";
import Icon from "../atoms/TrendIcon";

interface TrendCardProps {
  // SvgImage: ;
  // SvgImage: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  SvgImage: React.ReactElement<React.SVGProps<SVGElement>>;
  title: string;
  avgStats: string;
  trendStats: string;
  upward: boolean;
  trendColor: string;
  trendBgColor: string;
  textColor: string;
  onClick: MouseEventHandler;
}

export const TrendCard = (props: TrendCardProps) => {
  const {
    SvgImage,
    title,
    avgStats,
    trendStats,
    upward,
    trendColor,
    trendBgColor,
    textColor,
    onClick,
  } = props;
  return (
    <div
      onClick={onClick}
      className="w-full p-4 bg-white/5 border-backgroundNeutralOneTen border-2 rounded-lg cursor-pointer"
    >
      <div className="w-10 rounded-full bg-backgroundNeutralHundred p-1 shadow-md">
        {SvgImage}
      </div>
      <div className="mt-2 text-xl text-backgroundNeutralSixty">{title}</div>
      <div className="flex flex-row mt-2">
        <div className="w-full text-3xl font-medium text-white dark:text-textNeutralOneTwenty">
          {avgStats}
        </div>
        <div
          className={`flex flex-row w-100 ${
            trendBgColor ? trendBgColor : "bg-red-500"
          }/5 px-4 rounded-md items-center`}
        >
          {upward ? (
            <Icon.UpwardTrend
              className={`w-8 ${trendColor ? trendColor : "fill-white"}`}
            />
          ) : (
            <Icon.DownwardTrend
              className={`w-8 ${trendColor ? trendColor : "fill-white"}`}
            />
          )}
          <div
            className={`ml-2 text-xl ${
              textColor ? textColor : "text-backgroundNeutralSixty"
            }`}
          >
            {trendStats}
          </div>
        </div>
      </div>
    </div>
  );
};
