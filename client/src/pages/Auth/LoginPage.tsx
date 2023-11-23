import { FormEvent } from "react";
import { useLogin } from "../../features/authentication/hooks/useLogin";
import { Button } from "../../components/ui/Button";
import { LabeledInput } from "../../components/ui/Input";

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

    console.log(credentials);
    await login(credentials);
  }

  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md sm:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
          Computer service
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <LabeledInput
            label="Ім'я користувача"
            placeholder="Введіть ім'я користувача"
            name="username"
          />
          <LabeledInput
            label="Пароль"
            type="password"
            placeholder="Введіть пароль"
            name="password"
          />
          <Button type="submit">Вхід</Button>
        </form>
      </div>
    </div>
  );
}
