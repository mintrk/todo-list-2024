import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ThemeProvider, createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xxs: true;
  }
}

const defaultTheme = createTheme({
  typography: {
    fontFamily: ["Anuphan", "sans-serif"].join(","),
  },
  breakpoints: {
    values: {
      xxs: 0,
      xs: 350,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const lightTheme = createTheme({
  ...defaultTheme,
  palette: {
    mode: "light",
    primary: {
      main: "#2DD9B0",
    },
    secondary: {
      main: "#89EFD7",
    },
    info: {
      main: "#2F333F",
    },
    error: { main: "#FF6060" },
    background: {
      default: "#fff",
      paper: "#F4F4F4",
    },
  },
});

const darkTheme = createTheme({
  ...defaultTheme,
  palette: {
    mode: "dark",
    primary: {
      main: "#2DD9B0",
    },
    secondary: {
      main: "#B3F9E8",
    },
    info: {
      main: "#fff",
    },
    error: { main: "#FF6060" },
    background: {
      default: "#2F333F",
      paper: "#4D5260",
    },
  },
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

const IThemeProvider = ({ children }: ThemeProviderProps) => {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = createTheme(themeMode === "light" ? lightTheme : darkTheme);
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          backgroundColor: theme.palette.background.default,
          width: "100%",
          height: "100%",
        }}>
        {children}
      </div>
    </ThemeProvider>
  );
};

export default IThemeProvider;
