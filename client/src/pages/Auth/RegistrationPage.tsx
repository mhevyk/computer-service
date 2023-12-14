import { FormEvent } from "react";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useForm } from "@auth/hooks/useForm";
import { useRegistration } from "@auth/hooks/useRegistration";

const initialData = {
  username: "",
  password: "",
  repeatedPassword: "",
};

export function RegistrationPage() {
  const [credentials, handleChange] = useForm({ initialData });
  const [registration, { isPending }] = useRegistration();
  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (credentials.password !== credentials.repeatedPassword) {
      return enqueueSnackbar("Паролі не збігаються", { variant: "error" });
    }

    await registration(credentials);
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
          <Input
            label="Повторіть пароль"
            type="password"
            placeholder="Введіть пароль ще раз..."
            value={credentials.repeatedPassword}
            onChange={handleChange("repeatedPassword")}
          />
          <div className="divider"></div>
          <Button variant="accent" type="submit" isLoading={isPending}>
            Зареєструватися
          </Button>
        </form>
      </div>
      <div className="mx-auto mt-5">
        У вас є обліковий запис?{" "}
        <Link to="/auth/login" className="text-accent">
          Ввійдіть
        </Link>
      </div>
    </div>
  );
}
