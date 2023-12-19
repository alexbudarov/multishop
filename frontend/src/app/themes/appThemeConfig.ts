import { amplicodeDarkTheme, amplicodeLightTheme } from "./amplicodeTheme/amplicodeTheme";

let activeAppTheme;

const appTheme = {
  name: "amplicode",
  light: amplicodeLightTheme,
  dark: amplicodeDarkTheme,
};

activeAppTheme = appTheme;

if (import.meta.env.VITE_DEMO_THEME) {
  const { demoTheme } = await import("./demoThemeConfig");
  activeAppTheme = demoTheme;
}

export { activeAppTheme };
