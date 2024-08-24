import Icon from "../../components/atoms/TrendIcon";
import MyLocale from "../locale/en";

enum FilterBy {month, threeMonths, year}
enum TrendType {failure_rate, cost_saving, quality_score, product_efficiency}
enum FailureType { all, none, cracked, damaged, deformed}
enum ProductType { all, iphone, ipad, imac}
enum SeverityType { high, medium, low}

const filterData = [
  {
    title: MyLocale.oneMonth,
    id: FilterBy.month,
  },
  {
    title: MyLocale.threeMonths,
    id: FilterBy.threeMonths,
  },
  {
    title: MyLocale.oneYear,
    id: FilterBy.year,
  }
];

const productTypeData = [
  {
    title: 'All',
    id: ProductType.all,
  },
  {
    title: 'iPhone',
    id: ProductType.iphone,
  },
  {
    title: 'iPad',
    id: ProductType.ipad,
  },
  {
    title: 'imac',
    id: ProductType.imac,
  },
];

const failureTypeData = [
  {
    title: 'All',
    id: FailureType.all,
  },
  {
    title: 'Cracked',
    id: FailureType.cracked,
  },
  {
    title: 'Damaged',
    id: FailureType.damaged,
  },
  {
    title: 'Deformed',
    id: FailureType.deformed,
  },
  {
    title: 'Regular',
    id: FailureType.none,
  },
];


const TrendData = [
  {
    Icon: Icon.FailureRateIcon,
    title: MyLocale.failureRate,
    id: TrendType[TrendType.failure_rate],
  },
  {
    Icon: Icon.DollarIcon,
    title: MyLocale.costSavings,
    id: TrendType[TrendType.cost_saving],
  },
  {
    Icon: Icon.QualityScoreIcon,
    title: MyLocale.qualityScore,
    id: TrendType[TrendType.quality_score],
  },
  {
    Icon: Icon.PerformanceEfficiencyIcon,
    title: MyLocale.productionEfficiency,
    id: TrendType[TrendType.product_efficiency],
  }
];

export {FilterBy, FailureType, ProductType, TrendType, filterData, TrendData, failureTypeData, productTypeData};