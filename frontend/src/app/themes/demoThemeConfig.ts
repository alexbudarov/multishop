import {
  defaultDarkTheme,
  defaultLightTheme,
  houseDarkTheme,
  houseLightTheme,
  nanoDarkTheme,
  nanoLightTheme,
  radiantDarkTheme,
  radiantLightTheme,
} from "react-admin";
import { amplicodeDarkTheme, amplicodeLightTheme } from "./amplicodeTheme/amplicodeTheme";

const themes = [
  { name: "amplicode", light: amplicodeLightTheme, dark: amplicodeDarkTheme },
  { name: "default", light: defaultLightTheme, dark: defaultDarkTheme },
  { name: "nano", light: nanoLightTheme, dark: nanoDarkTheme },
  { name: "radiant", light: radiantLightTheme, dark: radiantDarkTheme },
  { name: "house", light: houseLightTheme, dark: houseDarkTheme },
];

export const demoTheme =
  themes.find((theme) => theme.name === import.meta.env.VITE_DEMO_THEME) ?? themes[0];
