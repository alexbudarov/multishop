import { ThemeType } from "react-admin";

export const THEME_MODE_CONFIG_STORAGE_KEY = "theme-mode";

export const getStoredThemeMode = (): ThemeType => {
  const themeMode = localStorage.getItem(THEME_MODE_CONFIG_STORAGE_KEY);

  return (themeMode || "light") as ThemeType;
};
