import React, { useEffect, useState } from 'react';
import { fetchFilters } from "../../services/api";
import { useFilters } from '../../context/FilterContext.jsx';

const Select = ({ label, name, options, value, onChange }) => (
  <div className="filter-group">
    <label>{label}</label>
    <select value={value} onChange={e => onChange(name, e.target.value)}>
      <option value="">All</option>
      {options.filter(Boolean).sort().map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const FilterPanel = () => {
  const { filters, updateFilter, resetFilters } = useFilters();
  const [options, setOptions] = useState({});

  useEffect(() => {
    fetchFilters().then(res => setOptions(res.data)).catch(console.error);
  }, []);

  const filterDefs = [
    { label: 'End Year',  name: 'end_year', key: 'end_years' },
    { label: 'Topic',     name: 'topic',    key: 'topics' },
    { label: 'Sector',    name: 'sector',   key: 'sectors' },
    { label: 'Region',    name: 'region',   key: 'regions' },
    { label: 'Country',   name: 'country',  key: 'countries' },
    { label: 'City',      name: 'city',     key: 'cities' },
    { label: 'PEST',      name: 'pestle',   key: 'pestles' },
    { label: 'Source',    name: 'source',   key: 'sources' },
    { label: 'SWOT',      name: 'swot',     key: 'swots' },
  ];

  return (
    <aside className="filter-panel">
      <div className="filter-header">
        <span className="filter-icon">⚙</span>
        <h2>Filters</h2>
      </div>
      <div className="filter-list">
        {filterDefs.map(f => (
          <Select
            key={f.name}
            label={f.label}
            name={f.name}
            options={options[f.key] || []}
            value={filters[f.name]}
            onChange={updateFilter}
          />
        ))}
      </div>
      <button className="reset-btn" onClick={resetFilters}>↺ Reset All</button>
    </aside>
  );
};

export default FilterPanel;
