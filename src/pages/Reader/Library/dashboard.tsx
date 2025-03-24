import { useState, useMemo } from "react";
import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  PaletteMode,
} from "@mui/material";
import Header from "../../../components/reader/Header";
import LibraryBooks from "../../../components/reader/LibraryBook";
import Footer from "../../../components/reader/Footer";
import BackgroundText from "../../../components/reader/BackgroundText";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: { main: "#6247aa" },
          secondary: { main: "#ff7f7f" },
          background: { default: "#f0f4f8", paper: "#ffffff" },
        }
      : {
          primary: { main: "#9d8cd6" },
          secondary: { main: "#ff9999" },
          background: { default: "#1a1a2e", paper: "#16213e" },
        }),
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: { root: { borderRadius: 8 } },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
          },
        },
      },
    },
  },
});

const Dashboard = () => {
  const [mode, setMode] = useState<PaletteMode>("light");

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const toggleColorMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
          <Header toggleColorMode={toggleColorMode} />
          <BackgroundText />
          <Box component="main" sx={{ flexGrow: 1, overflow: "hidden" }}>
            <Container maxWidth="xl" disableGutters sx={{ py: 10 }}>
              <LibraryBooks />
            </Container>
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default Dashboard;
