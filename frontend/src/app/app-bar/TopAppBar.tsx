import { AppBar, LocalesMenuButton, RefreshIconButton } from "react-admin";
import { ToggleThemeButton } from "./ToggleThemeButton";

export const TopAppBar = () => (
  <AppBar
    toolbar={
      <>
        <LocalesMenuButton />
        <ToggleThemeButton />
        <RefreshIconButton />
      </>
    }
  />
);
