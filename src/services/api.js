import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.API_URL,
});

export const fetchData = (filters = {}) => {
  const params = {};
  Object.entries(filters).forEach(([k, v]) => {
    if (v) params[k] = v;
  });
  return API.get("/data", { params });
};

export const fetchFilters = () => API.get("/filters");
