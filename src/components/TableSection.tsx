import React from "react";
import type { Theme, TableRowData } from "../types";
import { formatNumber } from "../utils/formatters";

interface TableSectionProps {
  title: string;
  subtitle?: string;
  data: TableRowData[];
  theme: Theme;
  isLoading?: boolean;
  isEmpty?: boolean;
}

export const TableSection: React.FC<TableSectionProps> = ({
  title,
  subtitle,
  data,
  theme,
  isLoading = false,
  isEmpty = false,
}) => {
  if (isLoading) {
    return (
      <div
        className={`rounded-xl border overflow-hidden animate-pulse ${
          theme === "dark"
            ? "border-slate-800/80 bg-background-alt/80"
            : "border-gray-200 bg-white"
        }`}
      >
        <div
          className={`px-3 sm:px-4 py-3 border-b ${
            theme === "dark" ? "border-slate-800/80" : "border-gray-200"
          }`}
        >
          <div
            className={`h-4 w-32 rounded ${
              theme === "dark" ? "bg-slate-700" : "bg-gray-200"
            }`}
          />
        </div>
        <div className="p-4 space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-12 rounded ${
                theme === "dark" ? "bg-slate-800/50" : "bg-gray-100"
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div
        className={`rounded-xl border p-8 sm:p-12 text-center ${
          theme === "dark"
            ? "border-slate-800/80 bg-background-alt/80"
            : "border-gray-200 bg-white"
        }`}
      >
        <div
          className={`text-4xl mb-4 ${
            theme === "dark" ? "text-slate-600" : "text-gray-400"
          }`}
        >
          📊
        </div>
        <div
          className={`text-sm font-medium mb-2 ${
            theme === "dark" ? "text-slate-300" : "text-gray-700"
          }`}
        >
          No data available yet
        </div>
        <div
          className={`text-xs ${
            theme === "dark" ? "text-slate-500" : "text-gray-500"
          }`}
        >
          Data will appear here once available
        </div>
      </div>
    );
  }

  return (
    <section
      className={`rounded-xl border overflow-hidden ${
        theme === "dark"
          ? "border-slate-800/80 bg-background-alt/80"
          : "border-gray-200 bg-white"
      }`}
    >
      <header
        className={`px-3 sm:px-4 py-3 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 ${
          theme === "dark" ? "border-slate-800/80" : "border-gray-200"
        }`}
      >
        <div className="min-w-0 flex-1">
          <div
            className={`text-[10px] sm:text-[11px] uppercase tracking-[0.18em] mb-1 font-semibold ${
              theme === "dark" ? "text-slate-500" : "text-gray-500"
            }`}
          >
            {title}
          </div>
          {subtitle && (
            <div
              className={`text-[10px] sm:text-xs hidden sm:block ${
                theme === "dark" ? "text-slate-400" : "text-gray-500"
              }`}
            >
              {subtitle}
            </div>
          )}
        </div>
        <button
          className={`px-2 sm:px-2.5 py-1 rounded-lg border text-[10px] sm:text-[11px] whitespace-nowrap flex-shrink-0 ${
            theme === "dark"
              ? "border-slate-800/80 text-slate-300 hover:border-slate-600"
              : "border-gray-300 text-gray-700 hover:border-gray-400"
          }`}
        >
          View all
        </button>
      </header>
      <div className="overflow-x-auto text-[10px] sm:text-[11px]">
        <table className="min-w-full border-collapse">
          <thead className={theme === "dark" ? "bg-slate-900/60" : "bg-gray-50"}>
            <tr
              className={`text-left ${
                theme === "dark" ? "text-slate-400" : "text-gray-600"
              }`}
            >
              <th
                className={`px-2 sm:px-4 py-2 font-semibold border-b ${
                  theme === "dark" ? "border-slate-800/80" : "border-gray-200"
                }`}
              >
                Page
              </th>
              <th
                className={`px-2 sm:px-4 py-2 font-semibold border-b ${
                  theme === "dark" ? "border-slate-800/80" : "border-gray-200"
                }`}
              >
                Views
              </th>
              <th
                className={`px-2 sm:px-4 py-2 font-semibold border-b hidden sm:table-cell ${
                  theme === "dark" ? "border-slate-800/80" : "border-gray-200"
                }`}
              >
                Unique
              </th>
              <th
                className={`px-2 sm:px-4 py-2 font-semibold border-b hidden md:table-cell ${
                  theme === "dark" ? "border-slate-800/80" : "border-gray-200"
                }`}
              >
                Avg. time
              </th>
              <th
                className={`px-2 sm:px-4 py-2 font-semibold border-b hidden lg:table-cell ${
                  theme === "dark" ? "border-slate-800/80" : "border-gray-200"
                }`}
              >
                Bounce
              </th>
              <th
                className={`px-2 sm:px-4 py-2 font-semibold border-b text-right ${
                  theme === "dark" ? "border-slate-800/80" : "border-gray-200"
                }`}
              >
                Trend
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className={`border-b hover:bg-opacity-50 transition-colors ${
                  theme === "dark"
                    ? "border-slate-900/80 hover:bg-slate-900/30"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <td className="px-2 sm:px-4 py-2 min-w-[120px] sm:min-w-0">
                  <div
                    className={`font-semibold truncate ${
                      theme === "dark" ? "text-slate-100" : "text-gray-900"
                    }`}
                  >
                    {row.page}
                  </div>
                  <div
                    className={`text-[9px] sm:text-[10px] truncate ${
                      theme === "dark" ? "text-slate-500" : "text-gray-500"
                    }`}
                  >
                    {row.description}
                  </div>
                </td>
                <td
                  className={`px-2 sm:px-4 py-2 whitespace-nowrap ${
                    theme === "dark" ? "text-slate-200" : "text-gray-700"
                  }`}
                >
                  {formatNumber(row.views)}
                </td>
                {row.unique !== undefined && (
                  <td
                    className={`px-2 sm:px-4 py-2 hidden sm:table-cell whitespace-nowrap ${
                      theme === "dark" ? "text-slate-200" : "text-gray-700"
                    }`}
                  >
                    {formatNumber(row.unique)}
                  </td>
                )}
                {row.avgTime && (
                  <td
                    className={`px-2 sm:px-4 py-2 hidden md:table-cell whitespace-nowrap ${
                      theme === "dark" ? "text-slate-200" : "text-gray-700"
                    }`}
                  >
                    {row.avgTime}
                  </td>
                )}
                {row.bounce !== undefined && (
                  <td
                    className={`px-2 sm:px-4 py-2 hidden lg:table-cell whitespace-nowrap ${
                      row.bounce < 20
                        ? "text-emerald-400"
                        : row.bounce < 30
                        ? "text-amber-300"
                        : "text-red-400"
                    }`}
                  >
                    {row.bounce}%
                  </td>
                )}
                <td
                  className={`px-2 sm:px-4 py-2 text-right whitespace-nowrap ${
                    row.trendColor === "amber"
                      ? "text-amber-300"
                      : "text-emerald-400"
                  }`}
                >
                  ▲ {row.trend}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

