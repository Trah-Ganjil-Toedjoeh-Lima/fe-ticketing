import axios from "axios";

export const axiosInstance = axios.create({
  baseURL : process.env.NEXT_PUBLIC_JSON_URL,
  withCredentials: true,
});