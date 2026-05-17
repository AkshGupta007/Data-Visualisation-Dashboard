import React, { useEffect, useState, useCallback } from 'react';
import { fetchData } from '../services/api';
import { useFilters } from '../context/FilterContext.jsx';
import FilterPanel from '../components/filters/FilterPanel';
import StatCard from '../components/StatCards';
import IntensityBarChart from '../components/charts/IntensityBarChart';
import LikelihoodChart from '../components/charts/LikelihoodChart';
import RegionPieChart from '../components/charts/RegionPieChart';
import RelevanceChart from '../components/charts/RelevanceChart';
import YearlyTrendChart from '../components/charts/YearlyTrendChart';
import TopicsBubbleChart from '../components/charts/TopicsBubbleChart';
import CountryChart from '../components/charts/CountryChart';

const Dashboard = () => {
  const { filters } = useFilters();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const loadData = useCallback(() => {
    setLoading(true);
    fetchData(filters)
      .then(res => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [filters]);

  useEffect(() => { loadData(); }, [loadData]);

  const avgIntensity = data.length ? (data.reduce((s, d) => s + (d.intensity || 0), 0) / data.length).toFixed(1) : 0;
  const avgLikelihood = data.length ? (data.reduce((s, d) => s + (d.likelihood || 0), 0) / data.length).toFixed(1) : 0;
  const avgRelevance = data.length ? (data.reduce((s, d) => s + (d.relevance || 0), 0) / data.length).toFixed(1) : 0;
  const uniqueTopics = new Set(data.map(d => d.topic).filter(Boolean)).size;

  return (
    <div className={`app-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {sidebarOpen && <FilterPanel />}

      <main className="main-content">
        {/* Top Bar */}
        <header className="topbar">
          <div className="topbar-left">
            <button className="toggle-btn" onClick={() => setSidebarOpen(p => !p)}>
              {sidebarOpen ? '✕' : '☰'}
            </button>
            <div className="brand">
              <span className="brand-dot" />
              <h1>Insights by Aksh Gupta</h1>
            </div>
          </div>
          <div className="topbar-right">
            <span className="record-count">{loading ? '...' : `${data.length} records`}</span>
          </div>
        </header>

        {loading ? (
          <div className="loader-wrap">
            <div className="loader" />
            <p>Loading data...</p>
          </div>
        ) : (
          <div className="dashboard-body">
            {/* Stat Cards */}
            <section className="stats-row">
              <StatCard label="Total Records"    value={data.length}     icon="📊" color="#38bdf8" />
              <StatCard label="Avg Intensity"    value={avgIntensity}    icon="⚡" color="#f472b6" />
              <StatCard label="Avg Likelihood"   value={avgLikelihood}   icon="🎯" color="#34d399" />
              <StatCard label="Avg Relevance"    value={avgRelevance}    icon="🔍" color="#fb923c" />
              <StatCard label="Unique Topics"    value={uniqueTopics}    icon="🏷" color="#818cf8" />
            </section>

            {/* Charts Grid */}
            <div className="charts-grid">
              <div className="chart-card col-2">
                <h3>Intensity by Topic</h3>
                <div className="chart-wrap"><IntensityBarChart data={data} /></div>
              </div>

              <div className="chart-card">
                <h3>Likelihood over Years</h3>
                <div className="chart-wrap"><LikelihoodChart data={data} /></div>
              </div>

              <div className="chart-card">
                <h3>Distribution by Region</h3>
                <div className="chart-wrap"><RegionPieChart data={data} /></div>
              </div>

              <div className="chart-card">
                <h3>Relevance by Sector</h3>
                <div className="chart-wrap"><RelevanceChart data={data} /></div>
              </div>

              <div className="chart-card">
                <h3>Records by Year</h3>
                <div className="chart-wrap"><YearlyTrendChart data={data} /></div>
              </div>

              <div className="chart-card col-2">
                <h3>Topics — Intensity vs Likelihood</h3>
                <div className="chart-wrap"><TopicsBubbleChart data={data} /></div>
              </div>

              <div className="chart-card col-2">
                <h3>Top Countries</h3>
                <div className="chart-wrap"><CountryChart data={data} /></div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
