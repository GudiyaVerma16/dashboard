import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./style.css";
import { StatCard } from "./components/StatCard";
import { ChartCard } from "./components/ChartCard";
import { FilterBar } from "./components/FilterBar";
import { TableSection } from "./components/TableSection";
import { Tooltip } from "./components/Tooltip";
import { RevenueChart } from "./components/RevenueChart";
import type { Theme, DateFilter, StatCardData, TableRowData } from "./types";

const App: React.FC = () => {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem("theme") as Theme | null;
        return savedTheme || "dark";
    });
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [dateFilter, setDateFilter] = useState<DateFilter>("12m");
    const [chartMetric, setChartMetric] = useState<"revenue" | "activeUsers" | "orders">("revenue");

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.documentElement.classList.toggle("light", theme === "light");
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    // Simulate data loading
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [dateFilter]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    // Mock data based on date filter
    const getStatCards = (): StatCardData[] => {
        const baseData: StatCardData[] = [
            {
                title: "Total Revenue",
                value: 1240000,
                change: 18.3,
                icon: "₹",
                format: "currency",
                tooltip: "Total revenue represents all income generated from sales and services",
            },
            {
                title: "Active Users",
                value: 8291,
                change: 7.8,
                icon: "👥",
                format: "number",
                tooltip: "Number of users who have been active in the selected time period",
            },
            {
                title: "Conversion",
                value: 4.32,
                change: 0.7,
                icon: "✨",
                format: "percentage",
                tooltip: "Percentage of visitors who complete a desired action (purchase, signup, etc.)",
            },
            {
                title: "Health Score",
                value: 92,
                icon: "✅",
                format: "number",
                tooltip: "Overall health score based on product performance, reliability, and user engagement",
            },
        ];

        // Adjust values based on filter (mock)
        if (dateFilter === "today") {
            return baseData.map((card) => ({
                ...card,
                value: card.value * 0.03,
                change: (card.change || 0) * 0.5,
            }));
        } else if (dateFilter === "7d") {
            return baseData.map((card) => ({
                ...card,
                value: card.value * 0.2,
                change: (card.change || 0) * 0.7,
            }));
        } else if (dateFilter === "30d") {
            return baseData.map((card) => ({
                ...card,
                value: card.value * 0.6,
                change: (card.change || 0) * 0.9,
            }));
        }
        return baseData;
    };

    const getTableData = (): TableRowData[] => {
        return [
            {
                page: "/pricing",
                description: "Pricing and plans",
                views: 12482,
                unique: 10221,
                avgTime: "3m 12s",
                bounce: 18.4,
                trend: 12.3,
                trendColor: "emerald",
            },
            {
                page: "/dashboard",
                description: "Main product overview",
                views: 9378,
                unique: 7941,
                avgTime: "4m 01s",
                bounce: 12.6,
                trend: 8.9,
                trendColor: "emerald",
            },
            {
                page: "/onboarding",
                description: "New user journey",
                views: 6144,
                unique: 5091,
                avgTime: "5m 18s",
                bounce: 25.1,
                trend: 4.1,
                trendColor: "amber",
            },
            {
                page: "/blog/how-to-scale",
                description: "How to scale fast",
                views: 4801,
                unique: 3992,
                avgTime: "7m 02s",
                bounce: 14.2,
                trend: 6.7,
                trendColor: "emerald",
            },
        ];
    };

    const getFilterSubtitle = (): string => {
        switch (dateFilter) {
            case "today":
                return "Today";
            case "7d":
                return "Last 7 days";
            case "30d":
                return "Last 30 days";
            case "12m":
                return "Last 12 months";
        }
    };

    return (
        <div
            className={`min-h-screen flex ${theme === "dark" ? "bg-background text-slate-100" : "bg-gray-50 text-gray-900"
                }`}
        >
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    } ${theme === "dark"
                        ? "bg-background-alt border-r border-slate-800/80"
                        : "bg-white border-r border-gray-200"
                    } flex flex-col`}
            >
                <div
                    className={`h-16 flex items-center justify-between px-6 border-b ${theme === "dark" ? "border-slate-800/80" : "border-gray-200"
                        }`}
                >
                    <div className="flex items-center">
                        <div
                            className={`h-9 w-9 rounded-xl bg-primary/10 border border-primary/40 flex items-center justify-center text-primary text-xl font-semibold`}
                        >
                            D
                        </div>
                        <div className="ml-3">
                            <div
                                className={`text-sm font-semibold tracking-wide ${theme === "dark" ? "text-slate-100" : "text-gray-900"
                                    }`}
                            >
                                My Dashboard
                            </div>
                            <div
                                className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-gray-500"
                                    }`}
                            >
                                Analytics &amp; Insights
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className={`lg:hidden p-2 rounded-lg ${theme === "dark" ? "hover:bg-slate-800/80" : "hover:bg-gray-100"
                            }`}
                    >
                        <span className="text-xl">✕</span>
                    </button>
                </div>

                <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1 text-sm">
                    <div
                        className={`text-[11px] uppercase font-semibold tracking-[0.18em] px-3 mb-2 ${theme === "dark" ? "text-slate-500" : "text-gray-500"
                            }`}
                    >
                        Overview
                    </div>
                    <button
                        className={`w-full flex items-center px-3 py-2 rounded-lg bg-primary/10 text-primary border border-primary/40 text-xs font-medium ${theme === "light" ? "hover:bg-primary/20" : ""
                            }`}
                    >
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary/20 mr-2 text-[13px]">
                            📊
                        </span>
                        Main Dashboard
                    </button>
                    <button
                        className={`w-full flex items-center px-3 py-2 rounded-lg text-xs ${theme === "dark"
                            ? "text-slate-300 hover:bg-slate-800/80"
                            : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        <span
                            className={`inline-flex h-6 w-6 items-center justify-center rounded-md mr-2 text-[13px] ${theme === "dark" ? "bg-slate-800" : "bg-gray-200"
                                }`}
                        >
                            👥
                        </span>
                        Customers
                    </button>
                    <button
                        className={`w-full flex items-center px-3 py-2 rounded-lg text-xs ${theme === "dark"
                            ? "text-slate-300 hover:bg-slate-800/80"
                            : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        <span
                            className={`inline-flex h-6 w-6 items-center justify-center rounded-md mr-2 text-[13px] ${theme === "dark" ? "bg-slate-800" : "bg-gray-200"
                                }`}
                        >
                            🧾
                        </span>
                        Orders
                    </button>
                    <button
                        className={`w-full flex items-center px-3 py-2 rounded-lg text-xs ${theme === "dark"
                            ? "text-slate-300 hover:bg-slate-800/80"
                            : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        <span
                            className={`inline-flex h-6 w-6 items-center justify-center rounded-md mr-2 text-[13px] ${theme === "dark" ? "bg-slate-800" : "bg-gray-200"
                                }`}
                        >
                            ⚙️
                        </span>
                        Settings
                    </button>

                    <div
                        className={`mt-6 text-[11px] uppercase font-semibold tracking-[0.18em] px-3 mb-2 ${theme === "dark" ? "text-slate-500" : "text-gray-500"
                            }`}
                    >
                        Reports
                    </div>
                    <button
                        className={`w-full flex items-center px-3 py-2 rounded-lg text-xs ${theme === "dark"
                            ? "text-slate-300 hover:bg-slate-800/80"
                            : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        <span
                            className={`inline-flex h-6 w-6 items-center justify-center rounded-md mr-2 text-[13px] ${theme === "dark" ? "bg-slate-800" : "bg-gray-200"
                                }`}
                        >
                            💰
                        </span>
                        Revenue
                    </button>
                    <button
                        className={`w-full flex items-center px-3 py-2 rounded-lg text-xs ${theme === "dark"
                            ? "text-slate-300 hover:bg-slate-800/80"
                            : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        <span
                            className={`inline-flex h-6 w-6 items-center justify-center rounded-md mr-2 text-[13px] ${theme === "dark" ? "bg-slate-800" : "bg-gray-200"
                                }`}
                        >
                            📈
                        </span>
                        Performance
                    </button>
                </nav>

                <div
                    className={`p-4 border-t text-xs ${theme === "dark"
                        ? "border-slate-800/80 text-slate-400"
                        : "border-gray-200 text-gray-600"
                        }`}
                >
                    <div className="flex items-center justify-between mb-2">
                        <span>Storage</span>
                        <span
                            className={`text-[11px] ${theme === "dark" ? "text-slate-500" : "text-gray-500"
                                }`}
                        >
                            72% used
                        </span>
                    </div>
                    <div
                        className={`h-1.5 rounded-full overflow-hidden mb-3 ${theme === "dark" ? "bg-slate-800" : "bg-gray-200"
                            }`}
                    >
                        <div className="h-full w-[72%] bg-gradient-to-r from-primary via-sky-400 to-emerald-400" />
                    </div>
                    <button className="w-full text-[11px] font-medium text-primary hover:text-primary-soft">
                        Upgrade plan
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Top bar */}
                <header
                    className={`h-16 border-b flex items-center justify-between px-4 sm:px-6 backdrop-blur ${theme === "dark"
                        ? "border-slate-800/80 bg-background/60"
                        : "border-gray-200 bg-white/60"
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleSidebar}
                            className={`lg:hidden p-2 rounded-lg ${theme === "dark" ? "hover:bg-slate-800/80" : "hover:bg-gray-100"
                                }`}
                        >
                            <span className="text-xl">☰</span>
                        </button>
                        <div>
                            <div
                                className={`text-xs font-semibold tracking-[0.14em] uppercase mb-1 hidden sm:block ${theme === "dark" ? "text-slate-400" : "text-gray-500"
                                    }`}
                            >
                                Welcome back
                            </div>
                            <div className="flex items-center gap-2">
                                <h1
                                    className={`text-base sm:text-lg font-bold tracking-tight ${theme === "dark" ? "text-slate-100" : "text-gray-900"
                                        }`}
                                >
                                    Analytics overview
                                </h1>
                                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-[11px] text-emerald-300 font-medium hidden sm:inline">
                                    Live
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="relative hidden sm:block">
                            <input
                                className={`w-40 md:w-52 text-[13px] rounded-lg border px-3 py-1.5 pl-8 outline-none focus:ring-2 focus:ring-primary/20 ${theme === "dark"
                                    ? "border-slate-800 bg-background-alt/80 text-slate-200 placeholder:text-slate-500 focus:border-primary/60"
                                    : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-primary/60"
                                    }`}
                                placeholder="Search reports, customers..."
                            />
                            <span
                                className={`absolute left-2.5 top-1/2 -translate-y-1/2 text-[13px] ${theme === "dark" ? "text-slate-500" : "text-gray-400"
                                    }`}
                            >
                                🔍
                            </span>
                        </div>
                        <Tooltip content="Toggle theme" theme={theme}>
                            <button
                                onClick={toggleTheme}
                                className={`h-8 w-8 rounded-full border flex items-center justify-center text-[15px] transition-colors ${theme === "dark"
                                    ? "bg-background-alt border-slate-800/80 hover:bg-slate-800/80"
                                    : "bg-white border-gray-300 hover:bg-gray-100"
                                    }`}
                                title={
                                    theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
                                }
                            >
                                {theme === "dark" ? "☀️" : "🌙"}
                            </button>
                        </Tooltip>
                        <button
                            className={`h-8 w-8 rounded-full border flex items-center justify-center text-[15px] ${theme === "dark"
                                ? "bg-background-alt border-slate-800/80 hover:bg-slate-800/80"
                                : "bg-white border-gray-300 hover:bg-gray-100"
                                }`}
                        >
                            🔔
                        </button>
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary via-fuchsia-500 to-amber-400 text-[13px] flex items-center justify-center font-semibold">
                            GV
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 px-3 sm:px-4 md:px-6 py-4 sm:py-5 overflow-y-auto">
                    {/* Date Filters */}
                    <FilterBar
                        selectedFilter={dateFilter}
                        onFilterChange={setDateFilter}
                        theme={theme}
                    />

                    {/* KPI cards */}
                    <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 mb-6">
                        {getStatCards().slice(0, 3).map((card, index) => (
                            <StatCard
                                key={card.title}
                                data={card}
                                theme={theme}
                                isLoading={isLoading}
                                index={index}
                            />
                        ))}
                        {/* Health Score Card - Special styling */}
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isLoading ? 0 : 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                            className={`rounded-xl border p-3 sm:p-4 bg-gradient-to-br from-emerald-500/10 via-primary/10 to-sky-500/10 cursor-pointer transition-all duration-300 ${theme === "dark"
                                ? "border-slate-800/80 hover:border-slate-700/80 hover:shadow-lg hover:shadow-slate-900/50"
                                : "border-gray-200 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50"
                                }`}
                        >
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <div className="flex-1 min-w-0">
                                    <div
                                        className={`text-[10px] sm:text-[11px] uppercase tracking-[0.18em] mb-1 truncate font-semibold ${theme === "dark" ? "text-slate-500" : "text-gray-500"
                                            }`}
                                    >
                                        Health score
                                    </div>
                                    <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                                        <div
                                            className={`text-lg sm:text-xl font-bold tracking-tight whitespace-nowrap ${theme === "dark" ? "text-slate-100" : "text-gray-900"
                                                }`}
                                        >
                                            92/100
                                        </div>
                                        <span
                                            className={`text-[10px] sm:text-[11px] whitespace-nowrap ${theme === "dark" ? "text-emerald-200" : "text-emerald-600"
                                                }`}
                                        >
                                            Excellent
                                        </span>
                                    </div>
                                </div>
                                <div className={`h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-300 text-[15px] sm:text-[17px] flex-shrink-0`}>
                                    ✅
                                </div>
                            </div>
                            <p
                                className={`text-[10px] sm:text-[11px] mb-2 sm:mb-3 leading-relaxed ${theme === "dark" ? "text-slate-300/80" : "text-gray-600"
                                    }`}
                            >
                                Your product performance, reliability and user engagement look very
                                healthy this week.
                            </p>
                            <button className="text-[11px] font-medium text-primary hover:text-primary-soft">
                                View detailed report →
                            </button>
                        </motion.article>
                    </section>

                    {/* Charts + table */}
                    <section className="grid gap-4 grid-cols-1 lg:grid-cols-3 mb-6">
                        {/* Line chart card */}
                        <ChartCard
                            title="Revenue trend"
                            subtitle={getFilterSubtitle()}
                            theme={theme}
                            isLoading={isLoading}
                            className="lg:col-span-2"
                            headerDropdown={
                                <div className="relative">
                                    <select
                                        value={chartMetric}
                                        onChange={(e) => setChartMetric(e.target.value as "revenue" | "activeUsers" | "orders")}
                                        className={`px-2.5 py-1 rounded-lg border text-[10px] sm:text-[11px] font-medium appearance-none cursor-pointer transition-colors ${theme === "dark"
                                            ? "border-slate-700/60 bg-slate-800/50 text-slate-200 hover:border-slate-600"
                                            : "border-gray-300 bg-gray-50 text-gray-700 hover:border-gray-400"
                                            }`}
                                        style={{
                                            fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='${theme === "dark" ? "%23cbd5e1" : "%236b7280"}' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "right 0.5rem center",
                                            paddingRight: "1.75rem",
                                        }}
                                    >
                                        <option value="revenue">Revenue</option>
                                        <option value="activeUsers">Active Users</option>
                                        <option value="orders">Orders</option>
                                    </select>
                                </div>
                            }
                            actionButton={
                                <button
                                    className={`px-2.5 py-1 rounded-lg border text-[11px] ${theme === "dark"
                                        ? "border-slate-800/80 text-slate-300 hover:border-slate-600"
                                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                                        }`}
                                    style={{ fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
                                >
                                    Download CSV
                                </button>
                            }
                        >
                            <RevenueChart
                                theme={theme}
                                isLoading={isLoading}
                                metricType={chartMetric}
                            />
                        </ChartCard>

                        {/* Sessions donut */}
                        <ChartCard
                            title="Sessions by device"
                            subtitle="Current week"
                            theme={theme}
                            isLoading={isLoading}
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isLoading ? 0 : 1 }}
                                transition={{ duration: 0.4 }}
                                className="flex items-center gap-3 sm:gap-4"
                            >
                                <div className="relative h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0">
                                    <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg,_#22c55e_0deg,_#22c55e_160deg,_#6366f1_160deg,_#6366f1_260deg,_#38bdf8_260deg,_#38bdf8_360deg)]" />
                                    <div
                                        className={`absolute inset-[18%] rounded-full ${theme === "dark" ? "bg-background-alt" : "bg-white"
                                            }`}
                                    />
                                    <div className="absolute inset-[30%] flex flex-col items-center justify-center text-[10px] sm:text-[11px]">
                                        <span
                                            className={
                                                theme === "dark" ? "text-slate-400" : "text-gray-500"
                                            }
                                        >
                                            Total
                                        </span>
                                        <span className="text-xs sm:text-sm font-semibold">32.4K</span>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-2 text-[11px]">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                            <span>Desktop</span>
                                        </div>
                                        <span
                                            className={
                                                theme === "dark" ? "text-slate-400" : "text-gray-500"
                                            }
                                        >
                                            54%
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-primary" />
                                            <span>Mobile</span>
                                        </div>
                                        <span
                                            className={
                                                theme === "dark" ? "text-slate-400" : "text-gray-500"
                                            }
                                        >
                                            31%
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-sky-400" />
                                            <span>Tablet</span>
                                        </div>
                                        <span
                                            className={
                                                theme === "dark" ? "text-slate-400" : "text-gray-500"
                                            }
                                        >
                                            15%
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </ChartCard>
                    </section>

                    {/* Table */}
                    <TableSection
                        title="Top performing pages"
                        subtitle="Last updated a few seconds ago"
                        data={getTableData()}
                        theme={theme}
                        isLoading={isLoading}
                        isEmpty={false}
                    />
                </main>
            </div>
        </div>
    );
};

export default App;
