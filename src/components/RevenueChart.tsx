import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import type { Theme } from "../types";
import { formatCurrency } from "../utils/formatters";

interface RevenueChartProps {
  theme: Theme;
  isLoading?: boolean;
  metricType?: "revenue" | "activeUsers" | "orders";
}

interface DataPoint {
  month: string;
  value: number;
  monthIndex: number;
}

// Mock data generator for different metrics
const generateData = (metricType: "revenue" | "activeUsers" | "orders" = "revenue"): DataPoint[] => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  // Base values for different metrics
  const baseValues = {
    revenue: 120000,
    activeUsers: 8500,
    orders: 3200,
  };
  
  const variations = [0.85, 0.92, 0.88, 0.95, 1.05, 1.12, 1.08, 1.15, 1.22, 1.18, 1.25, 1.28];
  
  return months.map((month, index) => ({
    month,
    value: Math.round(baseValues[metricType] * variations[index]),
    monthIndex: index,
  }));
};

export const RevenueChart: React.FC<RevenueChartProps> = ({
  theme,
  isLoading = false,
  metricType = "revenue",
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [screenWidth, setScreenWidth] = useState<number>(1024);
  const data = useMemo(() => generateData(metricType), [metricType]);

  // Detect screen size for responsive labels
  useEffect(() => {
    const checkScreenSize = () => {
      setScreenWidth(window.innerWidth);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const isMobile = screenWidth < 640;
  const isTablet = screenWidth >= 640 && screenWidth < 1024;

  if (isLoading) {
    return (
      <div
        className={`h-48 sm:h-56 rounded-lg animate-pulse ${
          theme === "dark" ? "bg-slate-800/50" : "bg-gray-100"
        }`}
      />
    );
  }

  // Calculate chart dimensions
  const width = 100;
  const height = 100;
  // Reduced bottom padding since labels are moved up
  const padding = { top: 10, right: 5, bottom: isMobile ? 16 : 14, left: 5 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Find min/max for scaling
  const values = data.map((d) => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue;

  // Calculate points
  const points = data.map((point, index) => {
    const x = padding.left + (index / (data.length - 1)) * chartWidth;
    const y =
      padding.top +
      chartHeight -
      ((point.value - minValue) / range) * chartHeight;
    return { x, y, ...point };
  });

  // Create smooth path for area chart using quadratic curves
  const createSmoothPath = (pathPoints: Array<{ x: number; y: number }>): string => {
    if (pathPoints.length === 0) return "";
    if (pathPoints.length === 1) return `M ${pathPoints[0].x} ${pathPoints[0].y}`;
    
    let path = `M ${pathPoints[0].x} ${pathPoints[0].y}`;
    
    for (let i = 0; i < pathPoints.length - 1; i++) {
      const current = pathPoints[i];
      const next = pathPoints[i + 1];
      
      if (i === 0) {
        // First segment: quadratic curve to midpoint
        const midX = (current.x + next.x) / 2;
        const midY = (current.y + next.y) / 2;
        path += ` Q ${current.x} ${current.y}, ${midX} ${midY}`;
      }
      
      if (i < pathPoints.length - 2) {
        // Middle segments: smooth curve to next midpoint
        const nextNext = pathPoints[i + 2];
        const nextMidX = (next.x + nextNext.x) / 2;
        const nextMidY = (next.y + nextNext.y) / 2;
        path += ` T ${nextMidX} ${nextMidY}`;
      } else {
        // Last segment: curve to final point
        path += ` T ${next.x} ${next.y}`;
      }
    }
    
    return path;
  };

  // Create area path (closed path for area fill)
  const areaPath = (() => {
    const smoothPath = createSmoothPath(points);
    const firstPoint = points[0];
    const lastPoint = points[points.length - 1];
    return `${smoothPath} L ${lastPoint.x} ${height - padding.bottom} L ${firstPoint.x} ${height - padding.bottom} Z`;
  })();

  // Calculate statistics
  const bestMonth = data.reduce((max, curr) => (curr.value > max.value ? curr : max), data[0]);
  const lowestMonth = data.reduce((min, curr) => (curr.value < min.value ? curr : min), data[0]);
  const averageRevenue = Math.round(data.reduce((sum, d) => sum + d.value, 0) / data.length);

  const hoveredPoint = hoveredIndex !== null ? points[hoveredIndex] : null;

  return (
    <div className="relative">
      {/* Chart Container */}
      <div className="relative h-48 sm:h-56 rounded-lg overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Subtle grid lines (minimal) */}
          {[0.25, 0.5, 0.75].map((ratio) => (
            <line
              key={ratio}
              x1={padding.left}
              y1={padding.top + ratio * chartHeight}
              x2={width - padding.right}
              y2={padding.top + ratio * chartHeight}
              stroke={theme === "dark" ? "rgba(148, 163, 184, 0.08)" : "rgba(148, 163, 184, 0.15)"}
              strokeWidth="0.5"
            />
          ))}

          {/* Area fill */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            d={areaPath}
            fill={
              theme === "dark"
                ? "url(#areaGradientDark)"
                : "url(#areaGradientLight)"
            }
          />

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="areaGradientDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="areaGradientLight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Line */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            d={createSmoothPath(points)}
            fill="none"
            stroke="#6366f1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {points.map((point, index) => (
            <g key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r={hoveredIndex === index ? "1.2" : "0.8"}
                fill="#6366f1"
                opacity={hoveredIndex === index ? 1 : 0.6}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer transition-all"
              />
              {/* Invisible larger hit area */}
              <circle
                cx={point.x}
                cy={point.y}
                r="3"
                fill="transparent"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer"
              />
            </g>
          ))}

          {/* Month labels - responsive with rotation and filtering */}
          {points.map((point, index) => {
            // On mobile, show only every 3rd month (0, 3, 6, 9)
            // On tablet, show every 2nd month (0, 2, 4, 6, 8, 10)
            // On desktop, show all months
            const shouldShow = isMobile 
              ? index % 3 === 0 
              : isTablet 
                ? index % 2 === 0 
                : true;

            if (!shouldShow) return null;

            // Rotate labels on mobile and tablet to prevent overlapping
            const rotation = isMobile ? -35 : isTablet ? -30 : 0;
            // Moved labels slightly upward
            const labelY = height - padding.bottom - 2 + (rotation !== 0 ? 4 : 2);
            // Reduced font size
            const fontSize = isMobile ? "3.5" : isTablet ? "3.8" : "4";
            
            return (
              <g key={index} transform={`translate(${point.x}, ${labelY}) rotate(${rotation})`}>
                <text
                  x="0"
                  y="0"
                  textAnchor="middle"
                  fontSize={fontSize}
                  fontWeight="400"
                  fill={theme === "dark" ? "rgba(203, 213, 225, 0.6)" : "rgba(107, 114, 128, 0.65)"}
                  fontFamily="Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                  className="select-none"
                >
                  {point.month}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover tooltip - improved with smooth animation */}
        {hoveredPoint && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute z-10 px-3 py-2 rounded-xl shadow-xl pointer-events-none backdrop-blur-sm ${
              theme === "dark"
                ? "bg-slate-900/95 border border-slate-700/50 text-slate-100"
                : "bg-white/95 border border-gray-200/50 text-gray-900"
            }`}
            style={{
              left: `${(hoveredPoint.x / width) * 100}%`,
              top: `${(hoveredPoint.y / height) * 100}%`,
              transform: "translate(-50%, -100%)",
              marginTop: "-10px",
            }}
          >
            <div className="text-[10px] sm:text-[11px] font-medium mb-0.5 text-slate-400" style={{ fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
              {hoveredPoint.month} 2025
            </div>
            <div className="text-xs sm:text-sm font-bold text-primary" style={{ fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
              {formatCurrency(hoveredPoint.value)}
            </div>
          </motion.div>
        )}
      </div>

      {/* Highlight chips - compact with icons */}
      <div className="flex flex-wrap items-center gap-1.5 mt-4">
        <div
          className={`px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-medium flex items-center gap-1 ${
            theme === "dark"
              ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
              : "bg-emerald-50 border border-emerald-200/60 text-emerald-700"
          }`}
          style={{ fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
        >
          <span className="text-[10px]">↑</span>
          <span>Best: {bestMonth.month} {formatCurrency(bestMonth.value)}</span>
        </div>
        <div
          className={`px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-medium flex items-center gap-1 ${
            theme === "dark"
              ? "bg-amber-500/10 border border-amber-500/20 text-amber-300"
              : "bg-amber-50 border border-amber-200/60 text-amber-700"
          }`}
          style={{ fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
        >
          <span className="text-[10px]">↓</span>
          <span>Lowest: {lowestMonth.month} {formatCurrency(lowestMonth.value)}</span>
        </div>
        <div
          className={`px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-medium flex items-center gap-1 ${
            theme === "dark"
              ? "bg-slate-700/40 border border-slate-600/30 text-slate-300"
              : "bg-gray-100 border border-gray-300/60 text-gray-700"
          }`}
          style={{ fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
        >
          <span className="text-[10px]">📊</span>
          <span>Avg: {formatCurrency(averageRevenue)}</span>
        </div>
      </div>

      {/* Label */}
      <div
        className={`mt-3 text-[10px] sm:text-[11px] ${
          theme === "dark" ? "text-slate-400" : "text-gray-500"
        }`}
        style={{ fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
      >
        Revenue trend compared to last year
      </div>
    </div>
  );
};

