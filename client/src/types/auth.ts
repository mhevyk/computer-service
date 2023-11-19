export type User = {
  id: number;
  username: string;
  role: string;
};

export type AuthResponse = {
  accessToken: string;
  user: User;
};

export type RegisrationCredentials = {
  username: string;
  password: string;
};

export type LoginCredentials = RegisrationCredentials;
