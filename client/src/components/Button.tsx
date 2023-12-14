import { ComponentProps, PropsWithChildren, ReactNode } from "react";
import { Size, Variant } from "@types";
import { twMerge } from "tailwind-merge";

function composeSizeClassName(size: Size) {
  switch (size) {
    case "sm":
      return "btn-sm";
    case "md":
      return "btn-md";
    case "lg":
      return "btn-lg";
  }
}

function composeVariantClassName(variant: Variant) {
  switch (variant) {
    case "primary":
      return "btn-primary";
    case "secondary":
      return "btn-secondary";
    case "accent":
      return "btn-accent";
    case "ghost":
      return "btn-ghost";
  }
}

type ButtonProps = PropsWithChildren &
  ComponentProps<"button"> & {
    variant?: Variant;
    size?: Size;
    icon?: ReactNode;
    isLoading?: boolean;
  };

export function Button({
  children,
  variant = "accent",
  size = "md",
  icon,
  className,
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const classes = [
    "btn",
    composeSizeClassName(size),
    composeVariantClassName(variant),
    "flex-nowrap",
  ];

  return (
    <button
      className={twMerge(classes, className)}
      disabled={isLoading || disabled}
      {...props}
    >
      {children}
      {isLoading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        icon
      )}
    </button>
  );
}
