import { ComponentProps, useId } from "react";

type InputProps = ComponentProps<"input"> & {
  label?: string;
};

export function Input({ label, type, placeholder, ...props }: InputProps) {
  const id = useId();

  return (
    <div>
      {label && (
        <label className="label" htmlFor={id}>
          <span className="text-base label-text">{label}</span>
        </label>
      )}
      <input
        type={type ?? "text"}
        id={id}
        placeholder={placeholder ?? label ?? "Введіть значення..."}
        className="w-full input input-bordered"
        {...props}
      />
    </div>
  );
}
