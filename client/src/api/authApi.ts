import axios from "axios";
import AuthService from "../features/authentication/services/AuthService";
import UserStoreService from "../features/authentication/services/UserStoreService";
import { BASE_URL } from "./common";

export const $authApi = axios.create({
  withCredentials: true,
  baseURL: `${BASE_URL}/auth`,
});

$authApi.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${
    UserStoreService.getValue()?.accessToken
  }`;
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
