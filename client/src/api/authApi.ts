import axios from "axios";
import AuthService from "@auth/services/AuthService";
import UserStoreService from "@auth/services/UserStoreService";
import { BASE_URL } from "./common";

export const $authApi = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

$authApi.interceptors.request.use(config => {
  const token = UserStoreService.getValue()?.accessToken;
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

$authApi.interceptors.response.use(
  config => {
    return config;
  },
  async error => {
    const originalRequest = error.config;

    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        const response = await AuthService.refresh();
        UserStoreService.saveValue(response.data);
        return $authApi.request(originalRequest);
      } catch (e) {
        console.log("Not auhorized");
      }
    }

    throw error;
  }
);
