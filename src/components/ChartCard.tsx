import React from "react";
import { motion } from "framer-motion";
import type { Theme } from "../types";

interface ChartCardProps {
  title: string;
  subtitle: string;
  theme: Theme;
  isLoading?: boolean;
  children: React.ReactNode;
  actionButton?: React.ReactNode;
  headerDropdown?: React.ReactNode;
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  theme,
  isLoading = false,
  children,
  actionButton,
  headerDropdown,
  className = "",
}) => {
  if (isLoading) {
    return (
      <div
        className={`rounded-2xl border p-4 sm:p-5 animate-pulse ${className} ${
          theme === "dark"
            ? "border-slate-800/80 bg-background-alt/80 shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
            : "border-gray-200 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <div
              className={`h-3 w-24 rounded mb-2 ${
                theme === "dark" ? "bg-slate-700" : "bg-gray-200"
              }`}
            />
            <div
              className={`h-4 w-32 rounded ${
                theme === "dark" ? "bg-slate-700" : "bg-gray-200"
              }`}
            />
          </div>
        </div>
        <div
          className={`h-48 sm:h-56 rounded-lg ${
            theme === "dark" ? "bg-slate-800/50" : "bg-gray-100"
          }`}
        />
      </div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl border p-4 sm:p-5 ${className} ${
        theme === "dark"
          ? "border-slate-800/80 bg-background-alt/80 shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
          : "border-gray-200 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-3">
        <div className="min-w-0">
          <div
            className={`text-[10px] sm:text-[11px] uppercase tracking-[0.18em] mb-1 truncate font-semibold ${
              theme === "dark" ? "text-slate-500" : "text-gray-500"
            }`}
            style={{ fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
          >
            {title}
          </div>
          <div
            className={`text-xs sm:text-sm font-semibold ${
              theme === "dark" ? "text-slate-100" : "text-gray-900"
            }`}
            style={{ fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
          >
            {subtitle}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {headerDropdown}
          {actionButton}
        </div>
      </div>
      {children}
    </motion.article>
  );
};

