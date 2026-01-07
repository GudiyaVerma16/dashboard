import React, { useState } from "react";
import type { Theme } from "../types";

interface TooltipProps {
  content: string;
  theme: Theme;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, theme, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute z-50 px-3 py-2 rounded-lg text-xs font-medium shadow-lg pointer-events-none whitespace-nowrap bottom-full left-1/2 transform -translate-x-1/2 mb-2 ${
            theme === "dark"
              ? "bg-slate-800 text-slate-100 border border-slate-700"
              : "bg-gray-900 text-white border border-gray-800"
          }`}
        >
          {content}
          <div
            className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 ${
              theme === "dark"
                ? "border-t-slate-800"
                : "border-t-gray-900"
            }`}
          />
        </div>
      )}
    </div>
  );
};

