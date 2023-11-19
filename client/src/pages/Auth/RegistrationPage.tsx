import { FormEvent, useRef } from "react";
import { useRegistration } from "../../auth/useRegistration";

export function RegistrationPage() {
  const registration = useRegistration();
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const repeatPasswordInputRef = useRef<HTMLInputElement | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const username = usernameInputRef.current?.value ?? "";
    const password = passwordInputRef.current?.value ?? "";
    const repeatedPassword = repeatPasswordInputRef.current?.value ?? "";

    if (
      !username ||
      !password ||
      !repeatedPassword ||
      password !== repeatedPassword
    ) {
      return;
    }

    const credentials = {
      username,
      password,
    };

    await registration(credentials);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="username" ref={usernameInputRef} />
      <input
        type="password"
        placeholder="password"
        name="password"
        ref={passwordInputRef}
      />
      <input
        type="password"
        placeholder="repeat password"
        ref={repeatPasswordInputRef}
      />
      <button type="submit">Registration</button>
    </form>
  );
}
