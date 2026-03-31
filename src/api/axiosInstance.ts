import axios, { type InternalAxiosRequestConfig } from "axios";


// - baseURL: rút gọn URL trong các page
// - auto attach Authorization header nếu có token trong localStorage
const BASE_URL = "http://103.166.183.82:4040/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // Ensure headers is always defined to satisfy Axios types in strict mode.
  config.headers = config.headers ?? {};
  const token = localStorage.getItem("token");
  if (token) {
    (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

