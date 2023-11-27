import { Theme } from "daisyui";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { THEMES } from "./constants";

type ThemeContextType = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

function checkDarkMode() {
  const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  return darkModeMediaQuery.matches;
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(() => {
    const isDarkMode = checkDarkMode();
    return THEMES[isDarkMode ? "dark" : "light"];
  });

  useEffect(() => {
    document.querySelector("html")!.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    function handleDarkModeChange(event: MediaQueryListEvent) {
      const theme = THEMES[event.matches ? "dark" : "light"];
      setTheme(theme);
    }

    darkModeMediaQuery.addEventListener("change", handleDarkModeChange);

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleDarkModeChange);
    };
  }, [setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
