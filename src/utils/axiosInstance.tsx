import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from "axios";
import { Cookies } from "react-cookie";

const BASE_URL = "https://fivefood.shop/";
const cookies = new Cookies();

// Hàm lấy token từ cookies
const getToken = () => cookies.get("accessToken");

const createAxiosInstance = (useAuth: boolean = true): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // withCredentials: true, // Quan trọng nếu API sử dụng cookies
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (useAuth) {
        const token = getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export default createAxiosInstance;
