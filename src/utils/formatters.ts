/**
 * Format currency in INR
 */
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 1,
        notation: amount >= 100000 ? 'compact' : 'standard',
    }).format(amount);
};

/**
 * Format number with locale-specific formatting
 */
export const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
        maximumFractionDigits: 0,
    }).format(value);
};

/**
 * Format percentage
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
};

