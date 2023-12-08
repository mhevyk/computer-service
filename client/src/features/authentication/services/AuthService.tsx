import { AuthResponse } from "../types/auth";
import { $publicApi } from "@api/publicApi";
import { $authApi } from "@api/authApi";

export default class AuthService {
  static login(username: string, password: string) {
    return $authApi.post<AuthResponse>("/login", { username, password });
  }

  static registration(username: string, password: string) {
    return $authApi.post<AuthResponse>("/registration", { username, password });
  }

  static logout() {
    return $authApi.post<void>("/logout");
  }

  static refresh() {
    // use public api to avoid calling interceptors
    return $publicApi.get<AuthResponse>(`/refresh`, { withCredentials: true });
  }
}
