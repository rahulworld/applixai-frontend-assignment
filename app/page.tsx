"use client";
import { MouseEvent, SetStateAction, useEffect, useRef, useState } from "react";

import { TrendCard } from "./src/components/molecules/card";
import { DefectScanner } from "./src/components/organisms/ModelPresenter";
import { manfacturingDataset } from "./src/utils/data/data";
import TrendTable from "./src/components/templates/TrendTable";
import Navbar from "./src/components/organisms/header";
import {
  FailureType,
  failureTypeData,
  FilterBy,
  filterData,
  ProductType,
  productTypeData,
  TrendData,
  TrendType,
} from "./src/utils/constants/constants";
import MyLocale from "./src/utils/locale/en";
import { Box, Stack, Typography } from "@mui/material";
import TrendLineChart from "./src/components/templates/TrendLineChart";
import TrendBarChart from "./src/components/templates/TrendBarChart";
import TrendPieChart from "./src/components/templates/TrendPieChart";
import {
  getPerformanceMatrics,
  getPerformanceMatricsByItem,
  getProductionEfficiencyDataset,
  getQualityScoreDataset,
  PerformanceMatricsType,
} from "./src/utils/filters/performance";
import { headers } from "next/headers";
import Head from "next/head";
// import TrendDropDown from "./src/components/molecules/dropdown";

// const BASE_URL = `http://${process.env.SERVER_URL}/api/`;
const BASE_URL = "http://3.145.150.125/api/";

export default function Home() {
  const [selectFilter, setSelectedFilter] = useState(FilterBy.year);
  const [selectProductType, setProductType] = useState(ProductType.all);
  const [selectDefectType, setDefectType] = useState(FailureType.all);
  const [manfactureStats, setManfactureStats] = useState<{
    [key: string]: number;
  }>();

  const [manifacturedDefectData, setManifacturedDefectData] = useState([]);
  const [pieChartData, setPieChartData] = useState<{ [key: string]: any }>({});
  const hasPageBeenRendered = useRef(false);

  const getApiQueryParams = (): string => {
    let searchParams: { [key: string]: string } = {};
    if (selectProductType !== ProductType.all) {
      searchParams["type"] = ProductType[selectProductType];
    }
    if (selectDefectType !== FailureType.all) {
      searchParams["defectType"] = FailureType[selectDefectType];
    }
    if (selectFilter !== FilterBy.year) {
      if (selectFilter == FilterBy.month) {
        searchParams["startDate"] = "2024-08-01";
        searchParams["endDate"] = "2024-08-31";
      }
      if (selectFilter == FilterBy.threeMonths) {
        searchParams["startDate"] = "2024-06-05";
        searchParams["endDate"] = "2024-08-31";
      }
    }
    let query = Object.keys(searchParams)
      .map(
        (k) => encodeURIComponent(k) + "=" + encodeURIComponent(searchParams[k])
      )
      .join("&");
    return query;
  };

  const getStatsOverview = async () => {
    let statOverviewUrl = `${BASE_URL}get_stats`;
    const query = getApiQueryParams();

    try {
      const response = await fetch(
        query ? statOverviewUrl + "?" + query : statOverviewUrl
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setManfactureStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getProductAndDefectOverview = async () => {
    var statOverviewUrl = new URL(`${BASE_URL}products`);
    const query = getApiQueryParams();
    try {
      const response = await fetch(
        query ? statOverviewUrl + "?" + query : statOverviewUrl
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setPieChartData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDefectOverview = async () => {
    var statOverviewUrl = new URL(`${BASE_URL}defects`);
    const query = getApiQueryParams();
    try {
      const response = await fetch(
        query ? statOverviewUrl + "?" + query : statOverviewUrl
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setManifacturedDefectData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const callApis = async () => {
    await getStatsOverview();
    await getDefectOverview();
    await getProductAndDefectOverview();
    hasPageBeenRendered.current = true;
  };

  useEffect(() => {
    callApis();
  }, []);

  useEffect(() => {
    console.log("its calling");
    if (hasPageBeenRendered.current) {
      callApis();
    }
  }, [selectProductType, selectFilter, selectDefectType]);

  const getTrendKey = (val: string): any => `${val}_trend`;

  const getTrendColor = (type: any): string => {
    let keyData = manfactureStats ? manfactureStats[getTrendKey(type)] : 1;
    if (keyData > 0) {
      return type === TrendType[TrendType.failure_rate]
        ? "fill-red-500"
        : "fill-green-500";
    }
    return type === TrendType[TrendType.failure_rate]
      ? "fill-green-500"
      : "fill-red-500";
  };

  const getTrendType = (type: any): boolean => {
    let keyData = manfactureStats ? manfactureStats[getTrendKey(type)] : 1;
    if (keyData > 0) {
      return true;
    }
    return false;
  };

  return (
    <main className="flex min-h-screen flex-col bg-background dark:bg-whiteTen font-outfit">
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <Navbar />
      <div className="flex flex-row w-full bg-slate-300/10 dark:bg-slate-500/95">
        <div className="flex flex-row ml-10 text-textNeutralThirty my-4 rounded-lg bg-whiteTen/15 py-1 px-2 shadow-md">
          <div className="text-textNeutralThirty mr-4 mt-2">
            {MyLocale.filterBy}
          </div>
          {filterData.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setSelectedFilter(item.id);
                }}
                className={`py-2 px-4 cursor-pointer ${
                  selectFilter === item.id
                    ? "bg-violet-200 text-dark rounded-sm"
                    : ""
                }`}
              >
                {item.title}
              </div>
            );
          })}
        </div>
        <div className="flex flex-row ml-3 text-textNeutralThirty my-4 rounded-lg bg-whiteTen/15 py-1 px-2 shadow-md">
          <div className="text-textNeutralThirty mr-4 mt-2">
            {"Product Type"}
          </div>
          {productTypeData.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setProductType(item.id);
                }}
                className={`py-2 px-4 cursor-pointer ${
                  selectProductType === item.id
                    ? "bg-violet-200 text-dark rounded-sm"
                    : ""
                }`}
              >
                {item.title}
              </div>
            );
          })}
        </div>
        <div className="flex flex-row ml-3 text-textNeutralThirty my-4 rounded-lg bg-whiteTen/15 py-1 px-2 shadow-md">
          <div className="text-textNeutralThirty mr-4 mt-2">
            {"Defect Type"}
          </div>
          {failureTypeData.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setDefectType(item.id);
                }}
                className={`py-2 px-4 cursor-pointer ${
                  selectDefectType === item.id
                    ? "bg-violet-200 text-dark rounded-sm"
                    : ""
                }`}
              >
                {item.title}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-row mx-10 gap-x-6 my-4">
        {TrendData.map((trend, index) => (
          <TrendCard
            key={index}
            SvgImage={<trend.Icon className={"w-8 fill-white"} />}
            title={trend.title}
            upward={getTrendType(trend.id)}
            trendColor={getTrendColor(trend.id)}
            onClick={() => {}}
            textColor={
              getTrendType(trend.id) ? "text-green-500" : "text-red-500"
            }
            avgStats={manfactureStats ? `${manfactureStats[trend.id]}%` : "1%"}
            trendStats={
              manfactureStats
                ? `${manfactureStats[getTrendKey(trend.id)]}%`
                : "1%"
            }
            trendBgColor={
              getTrendType(trend.id) ? "bg-green-500" : "bg-red-500"
            }
          />
        ))}
      </div>
      <div className="mx-10 text-backgroundNeutralSixty mt-10 mb-5 text-xl ">
        {MyLocale.performanceTrends}
      </div>
      <div className="flex flex-row w-full justify-center gap-x-6">
        <div className="w-full p-4 bg-white/5 border-backgroundNeutralOneTen border-2 rounded-lg cursor-pointer ml-10">
          <div className="w-full text-2xl text-white mx-4 py-3 dark:text-contentBackground">
            {MyLocale.failureRate}
          </div>
          <div className="flex w-full h-80">
            <TrendLineChart
              data={manifacturedDefectData}
              xAxisDataKey={"date"}
              yAxisDataKey={"faulty"}
            />
          </div>
          <TrendTable
            data={manifacturedDefectData}
            definedColumn={[
              { field: "date" },
              { field: "defectType" },
              { field: "productCategory" },
              { field: "faulty" },
              { field: "total_units" },
            ]}
          />
        </div>
        <div className="w-full p-4 bg-white/5 border-backgroundNeutralOneTen border-2 rounded-lg cursor-pointer mr-10">
          <div className="w-full text-2xl text-white mx-4 py-3 dark:text-contentBackground">
            {MyLocale.costSavings}
          </div>
          <div className="flex w-full h-80">
            <TrendBarChart
              data={manifacturedDefectData}
              xAxisDataKey={"date"}
              yAxisDataKey={"cost"}
            />
          </div>
          <div className="w-full mt-3 justify-center">
            <div className="flex flex-row w-full">
              <Stack
                direction="row"
                width="100%"
                textAlign="center"
                spacing={2}
              >
                <Box flexGrow={1}>
                  <Typography>iPhone</Typography>
                  <TrendPieChart
                    data={
                      Object.keys(pieChartData).length > 0 &&
                      pieChartData?.iphone
                        ? pieChartData["iphone"]
                        : getPerformanceMatricsByItem(
                            manfacturingDataset,
                            "iphone"
                          )
                    }
                  />
                </Box>
                <Box flexGrow={1}>
                  <Typography>iPad</Typography>
                  <TrendPieChart
                    data={
                      Object.keys(pieChartData).length > 0
                        ? pieChartData["ipad"]
                        : getPerformanceMatricsByItem(
                            manfacturingDataset,
                            "ipad"
                          )
                    }
                  />
                </Box>
                <Box flexGrow={1}>
                  <Typography>iMac</Typography>
                  <TrendPieChart
                    data={
                      Object.keys(pieChartData).length > 0
                        ? pieChartData["imac"]
                        : getPerformanceMatricsByItem(
                            manfacturingDataset,
                            "imac"
                          )
                    }
                  />
                </Box>
              </Stack>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full justify-center gap-x-6 mt-6">
        <div className="w-full border-backgroundNeutralOneTen border-2 rounded-lg cursor-pointer ml-10">
          <DefectScanner />
        </div>
        <div className="w-full flex flex-col mr-10 gap-y-4">
          <div className="w-full p-4 bg-white/5 border-backgroundNeutralOneTen border-2 rounded-lg cursor-pointer">
            <div className="w-full text-2xl text-white mx-4 py-3 dark:text-contentBackground">
              {MyLocale.qualityScore}
            </div>
            <div className="flex w-full h-80">
              <TrendLineChart
                data={getQualityScoreDataset(manifacturedDefectData)}
                xAxisDataKey={"date"}
                yAxisDataKey={"qualityScore"}
              />
            </div>
            <TrendTable
              data={getQualityScoreDataset(manifacturedDefectData)}
              definedColumn={[
                { field: "date" },
                { field: "productCategory" },
                { field: "qualityScore" },
              ]}
            />
          </div>
          <div className="w-full p-4 bg-white/5 border-backgroundNeutralOneTen border-2 rounded-lg cursor-pointer">
            <div className="w-full text-2xl text-white mx-4 py-3 dark:text-contentBackground">
              {MyLocale.productionEfficiency}
            </div>
            <TrendBarChart
              data={getProductionEfficiencyDataset(manifacturedDefectData)}
              xAxisDataKey={"date"}
              yAxisDataKey={"productionEfficiency"}
            />
            <TrendTable
              data={getProductionEfficiencyDataset(manifacturedDefectData)}
              definedColumn={[
                { field: "date" },
                { field: "productCategory" },
                { field: "productionEfficiency" },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="w-full h-32"></div>
    </main>
  );
}
