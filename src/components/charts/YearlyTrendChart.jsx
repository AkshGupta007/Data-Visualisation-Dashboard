import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const YearlyTrendChart = ({ data }) => {
  const chartData = useMemo(() => {
    const grouped = {};
    data.forEach(d => {
      const yr = d.end_year || d.start_year;
      if (yr) grouped[yr] = (grouped[yr] || 0) + 1;
    });
    const sorted = Object.entries(grouped).sort((a, b) => a[0] - b[0]);
    return {
      labels: sorted.map(([k]) => k),
      datasets: [{
        label: 'Records',
        data: sorted.map(([, v]) => v),
        backgroundColor: sorted.map((_, i) => `hsla(${160 + i * 8}, 70%, 50%, 0.8)`),
        borderRadius: 4,
      }]
    };
  }, [data]);

  return (
    <Bar data={chartData} options={{
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#94a3b8', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.07)' } }
      }
    }} />
  );
};

export default YearlyTrendChart;
