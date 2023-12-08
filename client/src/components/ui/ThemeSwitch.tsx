import { ChangeEvent } from "react";
import { useTheme } from "@context/ThemeContext/useTheme";
import { THEMES } from "@context/ThemeContext/constants";
import { Icon } from "@iconify/react";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  function handleSwitchToggle(event: ChangeEvent<HTMLInputElement>) {
    setTheme(THEMES[event.target.checked ? "dark" : "light"]);
  }

  return (
    <label className="flex cursor-pointer gap-2">
      <Icon icon="ph:sun" />
      <input
        checked={theme === THEMES.dark}
        onChange={handleSwitchToggle}
        type="checkbox"
        value="synthwave"
        className="toggle theme-controller"
      />
      <Icon icon="tabler:moon" />
    </label>
  );
}
