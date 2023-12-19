import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { IconButton, Tooltip, useMediaQuery } from "@mui/material";
import { useTranslate } from "ra-core";
import { ThemeType, Translate, useTheme, useThemesContext } from "react-admin";
import { THEME_MODE_CONFIG_STORAGE_KEY } from "../themes/getStoredThemeMode";

export const ToggleThemeButton = () => {
  const translate: Translate = useTranslate();
  const { darkTheme, defaultTheme } = useThemesContext();
  const prefersDarkMode: boolean = useMediaQuery("(prefers-color-scheme: dark)", {
    noSsr: true,
  });
  const [theme, setTheme] = useTheme(
    defaultTheme || (prefersDarkMode && darkTheme ? "dark" : "light")
  );

  const handleTogglePaletteType = (): void => {
    const newThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(newThemeMode);
    localStorage.setItem(THEME_MODE_CONFIG_STORAGE_KEY, newThemeMode as ThemeType);
  };
  const toggleThemeTitle: string = translate("ra.action.toggle_theme", {
    _: "Toggle Theme",
  });

  return (
    <Tooltip title={toggleThemeTitle} enterDelay={300}>
      <IconButton color="inherit" onClick={handleTogglePaletteType} aria-label={toggleThemeTitle}>
        {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};
