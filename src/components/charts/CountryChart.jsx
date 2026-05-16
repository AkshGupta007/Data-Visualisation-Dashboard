import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const CountryChart = ({ data }) => {
  const chartData = useMemo(() => {
    const grouped = {};
    data.forEach(d => { const k = d.country || 'Unknown'; if (k) grouped[k] = (grouped[k] || 0) + 1; });
    const sorted = Object.entries(grouped)
      .filter(([k]) => k && k !== 'Unknown')
      .sort((a, b) => b[1] - a[1]).slice(0, 12);
    return {
      labels: sorted.map(([k]) => k),
      datasets: [{
        label: 'Count',
        data: sorted.map(([, v]) => v),
        backgroundColor: 'rgba(52,211,153,0.8)',
        borderRadius: 6,
        borderSkipped: false,
      }]
    };
  }, [data]);

  return (
    <Bar data={chartData} options={{
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#94a3b8', font: { size: 10 }, maxRotation: 35 }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.07)' } }
      }
    }} />
  );
};

export default CountryChart;
