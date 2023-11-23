import { ComponentProps, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren & ComponentProps<"button">;

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button className="btn btn-accent" {...props}>
      {children}
    </button>
  );
}
