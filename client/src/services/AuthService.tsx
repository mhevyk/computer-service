import axios from "axios";
import { AuthResponse } from "../types/auth";

const BASE_URL = `http://localhost:5000`;

const $authApi = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export default class AuthService {
  static login(username: string, password: string) {
    return $authApi.post<AuthResponse>("/auth/login", { username, password });
  }

  static registration(username: string, password: string) {
    return $authApi.post<AuthResponse>("/auth/registration", {
      username,
      password,
    });
  }

  static logout() {
    return $authApi.post<void>("/auth/logout");
  }

  static refresh() {
    return axios.get<AuthResponse>(`${BASE_URL}/auth/refresh`, {
      withCredentials: true,
    });
  }
}
