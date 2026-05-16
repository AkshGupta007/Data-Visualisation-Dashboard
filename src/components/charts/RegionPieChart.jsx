import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ['#38bdf8','#818cf8','#34d399','#fb923c','#f472b6','#a78bfa','#facc15','#4ade80','#f87171','#22d3ee'];

const RegionPieChart = ({ data }) => {
  const chartData = useMemo(() => {
    const grouped = {};
    data.forEach(d => { const k = d.region || 'Unknown'; grouped[k] = (grouped[k] || 0) + 1; });
    const sorted = Object.entries(grouped).sort((a, b) => b[1] - a[1]).slice(0, 10);
    return {
      labels: sorted.map(([k]) => k),
      datasets: [{ data: sorted.map(([, v]) => v), backgroundColor: COLORS, borderWidth: 2, borderColor: '#0f172a' }]
    };
  }, [data]);

  return (
    <Doughnut data={chartData} options={{
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'right', labels: { color: '#94a3b8', font: { size: 11 }, padding: 12 } }
      },
      cutout: '65%'
    }} />
  );
};

export default RegionPieChart;
