import { useTheme } from '../contexts/ThemeContext';

export function useChartTheme() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return {
    gridStroke: 'var(--chart-grid)',
    axisColor: 'var(--chart-axis)',
    tooltipStyle: {
      backgroundColor: 'var(--chart-tooltip-bg)',
      border: `1px solid var(--border)`,
      borderRadius: '8px',
      color: 'var(--text)',
    },
    labelStyle: {
      fill: 'var(--chart-axis)',
      fontSize: 12,
    },
    primaryColor: 'var(--primary)',
    successColor: 'var(--success)',
    warningColor: 'var(--warning)',
    errorColor: 'var(--danger)',
  };
}