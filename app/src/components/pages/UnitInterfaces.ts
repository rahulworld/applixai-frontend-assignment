export interface ProductionUnitProps {
    defectType: string;
    date: string;
    productCategory: string;
    severity: string;
    faulty: number;
    total_units: number;
    cost: number;
}

export interface QualityScoreProps {
    defectType: string;
    date: string;
    productCategory: string;
    severity: string;
    faulty: number;
    total_units: number;
    cost: number;
    qualityScore: number;
}