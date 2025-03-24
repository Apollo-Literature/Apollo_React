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
  const [results, setResults] = useState<Book[]>([]);

  interface Book {
    key: string;
    title: string;
    author_name?: string[];
  }

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
    setResults([]);

    // Extracting book title from file name (removing extension)
    const fileName = selectedFile.name.replace(/\.[^/.]+$/, "").trim();

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(fileName)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch book data");
      }

      const data = await response.json();
      if (data.docs && data.docs.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const books: Book[] = data.docs.slice(0, 5).map((doc: any) => ({
          key: doc.key,
          title: doc.title,
          author_name: doc.author_name || [],
        }));
        setResults(books);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching book data:", error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
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
          <br></br>
          <br></br>
          <Container maxWidth="xl" disableGutters sx={{ textAlign: "center" }}>
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
                      <li key={book.key}>
                        <strong>{book.title}</strong>
                        {book.author_name && (
                          <Typography variant="body2">
                            by {book.author_name.join(", ")}
                          </Typography>
                        )}
                      </li>
                    ))}
                  </ul>
                </Box>
              )}

              {results.length === 0 && !isSearching && selectedFile && (
                <Typography variant="body2" color="text.secondary">
                  No similar books found.
                </Typography>
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
