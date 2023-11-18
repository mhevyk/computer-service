class AuthService {
  async registration(username: string, password: string) {}

  async login(username: string, password: string) {}

  async logout(refreshToken: string) {}

  async refresh(refreshToken: string) {}
}

export default new AuthService();
