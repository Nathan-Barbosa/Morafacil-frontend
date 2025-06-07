import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL || "https://api.phsouza.com.br/",
});

//|| "https://api.phsouza.com.br/"
