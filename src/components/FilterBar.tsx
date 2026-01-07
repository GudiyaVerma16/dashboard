import React from "react";
import type { Theme, DateFilter } from "../types";

interface FilterBarProps {
  selectedFilter: DateFilter;
  onFilterChange: (filter: DateFilter) => void;
  theme: Theme;
}

const filters: { value: DateFilter; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "12m", label: "Last 12 months" },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedFilter,
  onFilterChange,
  theme,
}) => {
  return (
    <div className="flex items-center gap-2 mb-4 sm:mb-6 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs font-medium transition-all duration-200 ${
            selectedFilter === filter.value
              ? theme === "dark"
                ? "bg-primary text-white border border-primary shadow-lg shadow-primary/20"
                : "bg-primary text-white border border-primary shadow-lg shadow-primary/20"
              : theme === "dark"
              ? "border border-slate-800/80 text-slate-300 hover:border-slate-600 hover:bg-slate-800/50"
              : "border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

