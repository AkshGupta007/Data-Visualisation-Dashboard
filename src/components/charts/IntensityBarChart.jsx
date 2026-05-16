import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IntensityBarChart = ({ data }) => {
  const chartData = useMemo(() => {
    const grouped = {};
    data.forEach(d => {
      const key = d.topic || 'Unknown';
      if (!grouped[key]) grouped[key] = { total: 0, count: 0 };
      grouped[key].total += d.intensity || 0;
      grouped[key].count += 1;
    });
    const sorted = Object.entries(grouped)
      .map(([k, v]) => ({ label: k, avg: v.count ? +(v.total / v.count).toFixed(1) : 0 }))
      .sort((a, b) => b.avg - a.avg)
      .slice(0, 12);

    return {
      labels: sorted.map(d => d.label.length > 18 ? d.label.slice(0, 18) + '…' : d.label),
      datasets: [{
        label: 'Avg Intensity',
        data: sorted.map(d => d.avg),
        backgroundColor: sorted.map((_, i) => `hsla(${200 + i * 12}, 80%, 55%, 0.85)`),
        borderRadius: 6,
        borderSkipped: false,
      }]
    };
  }, [data]);

  return (
    <Bar data={chartData} options={{
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, title: { display: false } },
      scales: {
        x: { ticks: { color: '#94a3b8', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.07)' } }
      }
    }} />
  );
};

export default IntensityBarChart;
