import { ChangeEvent } from "react";
import { useTheme } from "../../context/ThemeContext/useTheme";
import { THEMES } from "../../context/ThemeContext/constants";
import { Icon } from "@iconify/react";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  function handleSwitchToggle(event: ChangeEvent<HTMLInputElement>) {
    const themeIndex = Number(!event.target.checked);
    setTheme(THEMES[themeIndex]);
  }

  return (
    <label className="flex cursor-pointer gap-2">
      <Icon icon="ph:sun" />
      <input
        checked={theme === THEMES[0]}
        onChange={handleSwitchToggle}
        type="checkbox"
        value="synthwave"
        className="toggle theme-controller"
      />
      <Icon icon="tabler:moon" />
    </label>
  );
}
