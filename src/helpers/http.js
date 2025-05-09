import axios from "axios";
import { getAccesToken } from "../utils/token";

const baseURL = process.env.REACT_APP_API_URL;

const httpSinToken = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const httpConToken = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const httpConTokenImage = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

httpConToken.interceptors.request.use(
  (config) => {
    const token = getAccesToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpConTokenImage.interceptors.request.use(
  (config) => {
    const token = getAccesToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { httpSinToken, httpConToken, httpConTokenImage };
