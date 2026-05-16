import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const RelevanceChart = ({ data }) => {
  const chartData = useMemo(() => {
    const grouped = {};
    data.forEach(d => {
      const k = d.sector || 'Unknown';
      if (!grouped[k]) grouped[k] = { total: 0, count: 0 };
      grouped[k].total += d.relevance || 0;
      grouped[k].count += 1;
    });
    const sorted = Object.entries(grouped)
      .map(([k, v]) => ({ label: k, avg: +(v.total / v.count).toFixed(1) }))
      .sort((a, b) => b.avg - a.avg).slice(0, 10);

    return {
      labels: sorted.map(d => d.label.length > 14 ? d.label.slice(0, 14) + '…' : d.label),
      datasets: [{
        label: 'Avg Relevance',
        data: sorted.map(d => d.avg),
        backgroundColor: 'rgba(129,140,248,0.8)',
        borderRadius: 6,
        borderSkipped: false,
      }]
    };
  }, [data]);

  return (
    <Bar data={chartData} options={{
      indexAxis: 'y',
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.07)' } },
        y: { ticks: { color: '#94a3b8', font: { size: 11 } }, grid: { display: false } }
      }
    }} />
  );
};

export default RelevanceChart;
