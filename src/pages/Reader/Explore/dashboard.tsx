"use client";

import { useState, useMemo } from "react";
import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  PaletteMode,
  Typography,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import Header from "../../../components/reader/Header";
import Footer from "../../../components/reader/Footer";
import BackgroundText from "../../../components/reader/BackgroundText";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

// Define theme design tokens
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

const ExplorePage = () => {
  const [mode, setMode] = useState<PaletteMode>("light");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  interface Book {
    id: number;
    title: string;
  }

  const [results, setResults] = useState<Book[]>([]);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const toggleColorMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSearch = async () => {
    if (!selectedFile) return;
    setIsSearching(true);
    // Simulate AI model request delay
    setTimeout(() => {
      // Simulated AI results
      setResults([
        { id: 1, title: "Mystery of the Scanned Cover" },
        { id: 2, title: "AI Inspired Book" },
        { id: 3, title: "Another Book Match" },
      ]);
      setIsSearching(false);
    }, 2000);
  };

  return (
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

        <Box component="main" sx={{ flexGrow: 1, overflow: "hidden", py: 6 }}>
          <Container maxWidth="xl" disableGutters sx={{ textAlign: "center" }}>
            <br></br>
            <br></br>
            <Typography variant="h3" gutterBottom fontWeight="bold">
              Explore with AI
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Upload an image or book cover to discover similar titles.
            </Typography>

            <Stack spacing={3} alignItems="center">
              <Button
                variant="contained"
                component="label"
                startIcon={<ImageSearchIcon />}
              >
                Upload Book Cover
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </Button>

              {selectedFile && (
                <Typography variant="body1">
                  Selected: {selectedFile.name}
                </Typography>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                disabled={!selectedFile || isSearching}
              >
                {isSearching ? (
                  <CircularProgress size={24} />
                ) : (
                  "Search Similar Books"
                )}
              </Button>

              {results.length > 0 && (
                <Box mt={4}>
                  <Typography variant="h5" gutterBottom>
                    Similar Books Found:
                  </Typography>
                  <ul>
                    {results.map((book) => (
                      <li key={book.id}>{book.title}</li>
                    ))}
                  </ul>
                </Box>
              )}
            </Stack>
          </Container>
        </Box>

        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default ExplorePage;
