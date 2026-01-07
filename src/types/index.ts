export type Theme = "dark" | "light";

export type DateFilter = "today" | "7d" | "30d" | "12m";

export interface StatCardData {
    title: string;
    value: number;
    change?: number;
    icon: string;
    format?: "currency" | "number" | "percentage";
    tooltip?: string;
}

export interface TableRowData {
    page: string;
    description: string;
    views: number;
    unique?: number;
    avgTime?: string;
    bounce?: number;
    trend: number;
    trendColor?: "emerald" | "amber";
}

