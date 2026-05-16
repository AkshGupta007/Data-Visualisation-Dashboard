import React from "react";
import { FilterProvider } from "./context/FilterContext.jsx";
import Dashboard from "./pages/Dashboard";
import "./index.css";

function App() {
  return (
    <FilterProvider>
      <Dashboard />
    </FilterProvider>
  );
}

export default App;
