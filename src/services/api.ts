import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL || "https://191.252.60.126:8443",
});
