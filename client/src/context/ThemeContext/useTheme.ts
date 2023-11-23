import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error("useTheme() should be called within ThemeProvider");
  }

  return context;
}
