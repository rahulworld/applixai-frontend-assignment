import { DatasetType } from "@mui/x-charts/internals";
import { ProductionUnitProps } from "../../components/pages/UnitInterfaces";
import { TrendType } from "../constants/constants";

export type PerformanceMatricsType = {
    [key in keyof typeof TrendType]?: any
};

export const getQualityScoreDataset = (data: ProductionUnitProps[]): DatasetType => {
    let filteredData: DatasetType = [];
    data.forEach((item: ProductionUnitProps) => {
      filteredData.push({ ...item, qualityScore: item.total_units - item.faulty });
    });
    return filteredData;
  }

 export const getProductionEfficiencyDataset = (data: ProductionUnitProps[]): DatasetType => {
    let filteredData: DatasetType = [];
    let maxFaulty = 1;
    let minFaulty = 1;
    data.forEach((item: ProductionUnitProps) => {
      if (maxFaulty < item.faulty) {
        maxFaulty = item.faulty;
      }
      if (minFaulty > item.faulty) {
        minFaulty = item.faulty;
      }
    });
    data.forEach((item: ProductionUnitProps) => {
      filteredData.push({ ...item, productionEfficiency: (item.faulty * 100) / maxFaulty });
    });
    return filteredData;
  }

  export const getPerformanceMatricsByItem = (data: ProductionUnitProps[], itemType: string): DatasetType => {
    const filteredData = [];
    let damaged = 0;
    let deformed = 0;
    let cracked = 0;
    let none = 0;
    data.forEach((item) => {
      if (item.productCategory === itemType) {
        if (item.defectType === 'damaged') {
          damaged = damaged + item.faulty;
        }
        if (item.defectType === 'deformed') {
          deformed = damaged + item.faulty;
        }
        if (item.defectType === 'cracked') {
          cracked = damaged + item.faulty;
        }
        if (item.defectType === 'none') {
          none = damaged + item.faulty;
        }
      }
    });
    filteredData.push({ label: 'Damaged', value: damaged });
    filteredData.push({ label: 'Deformed', value: deformed });
    filteredData.push({ label: 'Cracked', value: cracked });
    return filteredData; 
  }

export function getPerformanceMatrics(data: ProductionUnitProps[]): PerformanceMatricsType {
    console.log('data', data);
    let baseCost = 600;
    let maximumCostSaving = 200;
    let maxFaultyProduct = 25;
    let minFaluire = 1;
    let maxFaluire = 1;
    let avgFaluire = 0;
    let maxCostSaving = 1;
    let minCostSaving = 1;
    let avgCostSaving = 0;
    let maxQualityScore = 1;
    let minQualityScore = 1;
    let avgQualityScore = 0;
    let maxProductionEfficiency = 1;
    let minProductionEfficiency = 1;
    let avgProductionEfficiency = 0;
    let dataSetLength = data.length ?? 1;
    data.forEach((item) => {
        if (maxFaluire < item.faulty) {
            maxFaluire = item.faulty
        }

        if (minFaluire > item.faulty) {
            minFaluire = item.faulty
        }

        avgFaluire = avgFaluire + item.faulty;

        const diffCost = baseCost - item.cost;
        if (maxCostSaving < diffCost) {
            maxCostSaving = diffCost
        }

        if (minCostSaving > diffCost) {
            minCostSaving = diffCost
        }

        avgCostSaving = avgCostSaving + diffCost;

        const diffQualityScore = item.total_units - item.faulty;
        if (maxQualityScore < diffQualityScore) {
            maxQualityScore = diffQualityScore
        }

        if (minQualityScore > diffQualityScore) {
            minQualityScore = diffQualityScore
        }

        avgQualityScore = avgQualityScore + diffQualityScore;

        const diffProductionEfficiency = maxFaultyProduct - item.faulty;
        if (maxProductionEfficiency < diffProductionEfficiency) {
            maxProductionEfficiency = diffProductionEfficiency
        }

        if (minProductionEfficiency > diffProductionEfficiency) {
            minProductionEfficiency = diffProductionEfficiency
        }

        avgProductionEfficiency = avgProductionEfficiency + diffProductionEfficiency;
    });
    return {
        [TrendType[TrendType.failure_rate]]: (avgFaluire/dataSetLength).toFixed(2),
        [TrendType[TrendType.cost_saving]]: (((avgCostSaving/dataSetLength) * 100)/maximumCostSaving).toFixed(2),
        [TrendType[TrendType.quality_score]]: (avgQualityScore/dataSetLength).toFixed(2),
        [TrendType[TrendType.product_efficiency]]: (avgProductionEfficiency/dataSetLength).toFixed(2),
        [`${TrendType[TrendType.failure_rate]}_trend`]: ((maxFaluire - avgFaluire) / maxFaultyProduct).toFixed(2),
        [`${TrendType[TrendType.cost_saving]}_trend`]: ((baseCost - minCostSaving)/baseCost).toFixed(2),
        [`${TrendType[TrendType.quality_score]}_trend`]: ((maxQualityScore - (avgCostSaving / dataSetLength))/100).toFixed(2),
        [`${TrendType[TrendType.product_efficiency]}_trend`]: (maxProductionEfficiency - (avgProductionEfficiency / dataSetLength)).toFixed(2),
    };
}