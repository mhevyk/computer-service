import { ComponentProps, PropsWithChildren, ReactNode } from "react";
import { SIZES, Size, VARIANTS, Variant } from "@types";
import { cc } from "@utils/cc";
import { twMerge } from "tailwind-merge";

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
  const classes = cc(
    "btn",
    VARIANTS.includes(variant) && `btn-${variant}`,
    SIZES.includes(size) && `btn-${size}`,
    "flex-nowrap"
  );

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
