import axios from "axios";
import { refreshTokeAPI } from "./auth";
import { jwtDecode } from "jwt-decode";

export const APIClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export function removeTokenHandler() {
  localStorage.removeItem("auth-store");
  window.location.replace("/login");
}

export function isTokenExpire(token) {
  try {
    const { exp, expiresIn } = jwtDecode(token);
    const now = Date.now() / 1000;
    return (exp ?? expiresIn) < now;
  } catch {
    return true;
  }
}

export const publicRoutes = ["/signup", "/refresh-token", "/login"];

let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(newToken) {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
}

function addRefreshSubscriber(cb) {
  refreshSubscribers.push(cb);
}

APIClient.interceptors.request.use(
  async (config) => {
    if (publicRoutes.includes(config.url)) {
      return config;
    }

    const authStore =
      JSON.parse(localStorage.getItem("auth-store"))?.state ?? {};
    const { token, refreshToken } = authStore;

    if (!token || !refreshToken) {
      removeTokenHandler();
      return config;
    }

    if (!isTokenExpire(token)) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }

    if (isTokenExpire(refreshToken)) {
      removeTokenHandler();
      return config;
    }

    if (isRefreshing) {
      return new Promise((resolve) => {
        addRefreshSubscriber((newToken) => {
          config.headers.Authorization = `Bearer ${newToken}`;
          resolve(config);
        });
      });
    }

    isRefreshing = true;

    try {
      const res = await refreshTokeAPI({ refreshToken });
      const newToken = res.data.token;

      const updatedAuthStore = {
        ...authStore,
        token: newToken,
      };
      localStorage.setItem(
        "auth-store",
        JSON.stringify({ state: updatedAuthStore })
      );

      config.headers.Authorization = `Bearer ${newToken}`;
      onRefreshed(newToken);
      return config;
    } catch {
      removeTokenHandler();
      return config;
    } finally {
      isRefreshing = false;
    }
  },
  (error) => Promise.reject(error)
);
