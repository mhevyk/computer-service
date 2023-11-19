import { AuthResponse } from "../types/auth";

class UserStoreService<T> {
  readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  saveValue = (value: T) => {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(this.key, serializedValue);
  };

  getValue = () => {
    try {
      const serializedValue = localStorage.getItem(this.key);

      if (!serializedValue) {
        return null;
      }

      return JSON.parse(serializedValue) as T;
    } catch {
      return null;
    }
  };

  deleteValue = () => {
    localStorage.removeItem(this.key);
  };
}

const LOCAL_STORAGE_KEY = "COMPUTER-SERVICE_USER";

export default new UserStoreService<AuthResponse>(LOCAL_STORAGE_KEY);
