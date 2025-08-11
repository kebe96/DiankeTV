import axios from "axios";

const api = axios.create({
  baseURL: "/api"
});

// si token dans localStorage, l'ajouter automatiquement
const token = localStorage.getItem("token");
if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default api;
