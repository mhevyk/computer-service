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

    console.log(credentials);
    await login(credentials);
  }

  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-1 ring-gray-800/50 md:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700 uppercase">
          Computer service
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className="text-base label-text">Ім'я користувача</span>
            </label>
            <input
              type="text"
              placeholder="Введіть ім'я користувача..."
              className="w-full input input-bordered"
              name="username"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Пароль</span>
            </label>
            <input
              type="password"
              placeholder="Введіть пароль..."
              className="w-full input input-bordered"
              name="password"
            />
          </div>
          <div>
            <button className="btn btn-neutral" type="submit">
              Вхід
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
