import { useState, ChangeEvent } from "react";

type UseForm<T> = {
  initialData: T;
};

export function useForm<T>({ initialData }: UseForm<T>) {
  const [formData, setFormData] = useState(initialData);

  function handleChange(name: keyof T) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [name]: event.target.value });
    };
  }

  return [formData, handleChange] as const;
}
