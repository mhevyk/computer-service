import { FormEvent } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "@features/authentication/hooks/useLogin";
import { useForm } from "@features/authentication/hooks/useForm";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

const initialData = {
  username: "",
  password: "",
};

export function LoginPage() {
  const [credentials, handleChange] = useForm({ initialData });
  const [login, { isPending }] = useLogin();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await login(credentials);
  }

  return (
    <div className="relative flex flex-col justify-center items-center h-screen overflow-hidden">
      <div className="w-full p-6 mx-auto bg-white rounded-md shadow-md ring-1 ring-gray-800/50 md:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700 uppercase">
          Computer service
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Ім'я користувача"
            placeholder="Введіть ім'я користувача..."
            value={credentials.username}
            onChange={handleChange("username")}
          />
          <Input
            label="Пароль"
            type="password"
            placeholder="Введіть пароль..."
            value={credentials.password}
            onChange={handleChange("password")}
          />
          <div className="divider"></div>
          <Button variant="accent" type="submit" isLoading={isPending}>
            Вхід
          </Button>
        </form>
      </div>
      <div className="mx-auto mt-5">
        Не маєте облікового запису?{" "}
        <Link to="/auth/registration" className="text-accent">
          Зареєструйтеся
        </Link>
      </div>
    </div>
  );
}
