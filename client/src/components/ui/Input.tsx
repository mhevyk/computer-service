import { ComponentProps, useId } from "react";

type InputProps = ComponentProps<"input"> & {
  label: string;
};

export function LabeledInput({
  label,
  type,
  placeholder,
  ...props
}: InputProps) {
  const id = useId();

  return (
    <div>
      <label className="label" htmlFor={id}>
        <span className="text-base label-text">{label}</span>
      </label>
      <input
        type={type ?? "text"}
        id={id}
        placeholder={placeholder ?? "Введіть значення..."}
        className="w-full input input-bordered input-primary"
        {...props}
      />
    </div>
  );
}
