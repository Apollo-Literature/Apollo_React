import React from "react";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

interface ThemeToggleProps {
  themeMode: string;
  setThemeMode: (mode: string) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  themeMode,
  setThemeMode,
}) => {
  const toggleTheme = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {themeMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default ThemeToggle;
