import React from "react";
import { motion } from "framer-motion";
import type { Theme, StatCardData } from "../types";
import { formatCurrency, formatNumber, formatPercentage } from "../utils/formatters";

interface StatCardProps {
  data: StatCardData;
  theme: Theme;
  isLoading?: boolean;
  index?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  data,
  theme,
  isLoading = false,
  index = 0,
}) => {
  const formatValue = () => {
    if (data.format === "currency") {
      return formatCurrency(data.value);
    } else if (data.format === "percentage") {
      return `${data.value}%`;
    }
    return formatNumber(data.value);
  };

  if (isLoading) {
    return (
      <div
        className={`rounded-xl border p-3 sm:p-4 animate-pulse ${
          theme === "dark"
            ? "border-slate-800/80 bg-background-alt/80"
            : "border-gray-200 bg-white"
        }`}
      >
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex-1 min-w-0">
            <div
              className={`h-3 w-20 rounded mb-2 ${
                theme === "dark" ? "bg-slate-700" : "bg-gray-200"
              }`}
            />
            <div
              className={`h-6 w-24 rounded ${
                theme === "dark" ? "bg-slate-700" : "bg-gray-200"
              }`}
            />
          </div>
          <div
            className={`h-8 w-8 sm:h-9 sm:w-9 rounded-lg ${
              theme === "dark" ? "bg-slate-700" : "bg-gray-200"
            }`}
          />
        </div>
      </div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={`rounded-2xl border p-4 sm:p-5 cursor-pointer transition-all duration-300 ${
        theme === "dark"
          ? "border-slate-800/80 bg-background-alt/80 shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:border-slate-700/80 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
          : "border-gray-200 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:border-gray-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
      }`}
      title={data.tooltip}
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex-1 min-w-0">
          <div
            className={`text-[10px] sm:text-[11px] uppercase tracking-[0.18em] mb-1 truncate font-semibold ${
              theme === "dark" ? "text-slate-500" : "text-gray-500"
            }`}
          >
            {data.title}
          </div>
          <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
            <div
              className={`text-lg sm:text-xl font-bold tracking-tight whitespace-nowrap ${
                theme === "dark" ? "text-slate-100" : "text-gray-900"
              }`}
            >
              {formatValue()}
            </div>
            {data.change !== undefined && (
              <span
                className={`text-[10px] sm:text-[11px] rounded-full px-1.5 sm:px-2 py-0.5 whitespace-nowrap ${
                  data.change >= 0
                    ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/40"
                    : "text-red-400 bg-red-500/10 border border-red-500/40"
                }`}
              >
                {formatPercentage(data.change)}
              </span>
            )}
          </div>
        </div>
        <div
          className={`h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-primary/10 border border-primary/40 flex items-center justify-center text-primary text-[15px] sm:text-[17px] flex-shrink-0`}
        >
          {data.icon}
        </div>
      </div>
    </motion.article>
  );
};

