import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const LikelihoodChart = ({ data }) => {
  const chartData = useMemo(() => {
    const grouped = {};
    data.forEach(d => {
      const yr = d.start_year || d.end_year || 'N/A';
      if (!grouped[yr]) grouped[yr] = { total: 0, count: 0 };
      grouped[yr].total += d.likelihood || 0;
      grouped[yr].count += 1;
    });
    const sorted = Object.entries(grouped)
      .filter(([k]) => k && k !== 'N/A')
      .sort((a, b) => a[0] - b[0]);

    return {
      labels: sorted.map(([k]) => k),
      datasets: [{
        label: 'Avg Likelihood',
        data: sorted.map(([, v]) => +(v.total / v.count).toFixed(2)),
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56,189,248,0.15)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#38bdf8',
      }]
    };
  }, [data]);

  return (
    <Line data={chartData} options={{
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#94a3b8', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.07)' } }
      }
    }} />
  );
};

export default LikelihoodChart;
