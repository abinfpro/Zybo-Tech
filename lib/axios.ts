import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    let token =
      Cookies.get("auth_token") ??
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY4NTY5MTMzLCJpYXQiOjE3NjcyNzMxMzMsImp0aSI6IjY3YjkyY2RmNjFjYzQyZTk4MWI1NzE0YmUzODhhYWFjIiwidXNlcl9pZCI6IkFSTTAwMDMifQ.NNeKq-1yqIx1e4iVawXYdiAnqej9p6BXwu4tLt9FH68";
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("auth_token");
      if (storedToken) {
        try {
          token = JSON.parse(storedToken);
        } catch (e) {
          token = storedToken;
        }
      }
    }

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
