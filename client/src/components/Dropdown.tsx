import { Icon } from "@iconify/react";
import { ReactNode } from "react";
import { Size } from "@types";
import { Button } from "./Button";
import { cc } from "@utils/cc";

const DROPDOWN_VARIANTS = ["start", "end"];

export type DropdownVariant = (typeof DROPDOWN_VARIANTS)[number];

export type DropdownItem = {
  label: string;
};

type DropdownProps<T extends DropdownItem> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
  label: ReactNode;
  size?: Size;
  variant?: DropdownVariant;
  hideCaretIcon?: boolean;
};

export function Dropdown<T extends DropdownItem>({
  items,
  renderItem,
  label,
  size = "sm",
  variant = "start",
  hideCaretIcon = false,
}: DropdownProps<T>) {
  function handleDropdownContentClick() {
    const element = document.activeElement as HTMLElement;
    element?.blur();
  }

  return (
    <div
      className={cc(
        "dropdown",
        DROPDOWN_VARIANTS.includes(variant) && `dropdown-${variant}`
      )}
    >
      <Button
        tabIndex={0}
        variant="ghost"
        size={size}
        icon={!hideCaretIcon && <Icon icon="radix-icons:caret-down" />}
      >
        {label}
      </Button>
      <ul
        className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-52"
        onClick={handleDropdownContentClick}
      >
        {items.map((item) => (
          <li key={item.label}>{renderItem(item)}</li>
        ))}
      </ul>
    </div>
  );
}
