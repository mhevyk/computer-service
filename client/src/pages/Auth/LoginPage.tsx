import { FormEvent } from "react";
import { useLogin } from "../../features/authentication/hooks/useLogin";

export function LoginPage() {
  const login = useLogin();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const credentials = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    await login(credentials);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button type="submit">Login</button>
    </form>
  );
}
