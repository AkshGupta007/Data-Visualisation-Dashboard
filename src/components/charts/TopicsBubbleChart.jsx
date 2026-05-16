import React, { useMemo } from 'react';
import { Bubble } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const TopicsBubbleChart = ({ data }) => {
  const chartData = useMemo(() => {
    const grouped = {};

    data.forEach((item) => {
      const topic = item.topic || 'Unknown';
      if (!grouped[topic]) {
        grouped[topic] = {
          intensity: 0,
          likelihood: 0,
          count: 0,
        };
      }

      grouped[topic].intensity += item.intensity || 0;
      grouped[topic].likelihood += item.likelihood || 0;
      grouped[topic].count += 1;
    });

    const points = Object.entries(grouped)
      .filter(([topic]) => topic !== 'Unknown')
      .map(([topic, values]) => ({
        topic,
        x: values.count ? +(values.intensity / values.count).toFixed(1) : 0,
        y: values.count ? +(values.likelihood / values.count).toFixed(1) : 0,
        r: Math.min(24, Math.max(6, values.count * 1.8)),
      }))
      .sort((a, b) => b.r - a.r)
      .slice(0, 18);

    return {
      datasets: [
        {
          label: 'Topics',
          data: points,
          backgroundColor: points.map((_, index) => `hsla(${190 + index * 10}, 78%, 58%, 0.55)`),
          borderColor: points.map((_, index) => `hsla(${190 + index * 10}, 88%, 70%, 0.9)`),
          borderWidth: 1,
        },
      ],
    };
  }, [data]);

  return (
    <Bubble
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => {
                const point = context.raw;
                return `${point.topic}: intensity ${point.x}, likelihood ${point.y}`;
              },
            },
          },
        },
        scales: {
          x: {
            title: { display: true, text: 'Avg Intensity', color: '#94a3b8' },
            ticks: { color: '#94a3b8' },
            grid: { color: 'rgba(255,255,255,0.07)' },
          },
          y: {
            title: { display: true, text: 'Avg Likelihood', color: '#94a3b8' },
            ticks: { color: '#94a3b8' },
            grid: { color: 'rgba(255,255,255,0.07)' },
          },
        },
      }}
    />
  );
};

export default TopicsBubbleChart;
