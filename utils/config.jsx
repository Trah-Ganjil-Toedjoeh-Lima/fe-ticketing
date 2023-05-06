import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    Authorization:
      typeof window !== "undefined" && localStorage.getItem("auth_token"),
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = localStorage.getItem("auth_token")
      ? `${localStorage.getItem("auth_token")}`
      : "";
    return config;
  },
  (error) => {
    // console.log(`Request error: ${error}`);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
