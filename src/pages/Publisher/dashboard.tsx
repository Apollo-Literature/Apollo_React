/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  PaletteMode,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Alert,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../../components/publisher/Header";
import Footer from "../../components/publisher/Footer";
import MyBooks from "../../components/publisher/MyBooks";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: { main: "#6247aa" },
          secondary: { main: "#ff7f7f" },
          background: {
            default: "#f0f4f8",
            paper: "#ffffff",
          },
        }
      : {
          primary: { main: "#9d8cd6" },
          secondary: { main: "#ff9999" },
          background: {
            default: "#1a1a2e",
            paper: "#16213e",
          },
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
      styleOverrides: {
        root: { borderRadius: 8 },
      },
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

function PublisherDashboard() {
  const [mode, setMode] = useState<PaletteMode>("light");
  const theme = createTheme(getDesignTokens(mode));
  const toggleColorMode = () =>
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    isbn: "",
    publicationDate: "",
    pageCount: "",
    language: "",
    price: "",
    thumbnail: "",
    url: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem("token");
    if (!token || token === "null") {
      setError("Missing authentication token. Please log in again.");
      return;
    }

    try {
      const payload = {
        ...formData,
        pageCount: parseInt(formData.pageCount),
        price: parseFloat(formData.price),
      };

      const response = await fetch(
        "https://crucial-lane-apollolibrary-9e92f19f.koyeb.app/api/v1/books/add-book",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to add book.");
      }

      setSuccess("Book added successfully!");
      setTimeout(() => window.location.reload(), 1000);
    } catch (err: any) {
      setError(err.message || "Failed to add book.");
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

        <Box component="main" sx={{ flexGrow: 1, overflow: "hidden" }}>
          <Container maxWidth={false} disableGutters>
            <br></br><br></br>
            <Box sx={{ py: 6, px: 4, textAlign: "center" }}>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                Publisher Dashboard
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Upload your books and manage your collection.
              </Typography>

              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 3 }}
                onClick={() => setOpen(true)}
              >
                + Add Book
              </Button>
            </Box>

            <Container maxWidth="xl" sx={{ py: 4 }}>
              <MyBooks />
            </Container>
          </Container>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/reader/dashboard"
            sx={{ textTransform: "none", fontSize: "1rem", px: 4 }}
          >
            Go to Reader Dashboard
          </Button>
        </Box>
        <br />
        <Footer />

        {/* Add Book Dialog */}
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
          <DialogTitle>Add New Book</DialogTitle>
          <DialogContent dividers>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <Grid container spacing={2}>
              {[
                { label: "Title", name: "title" },
                { label: "Author", name: "author" },
                { label: "Description", name: "description" },
                { label: "ISBN", name: "isbn" },
                { label: "Publication Date", name: "publicationDate", type: "date" },
                { label: "Page Count", name: "pageCount", type: "number" },
                { label: "Language", name: "language" },
                { label: "Price", name: "price", type: "number" },
                { label: "Thumbnail URL", name: "thumbnail" },
                { label: "Book File URL", name: "url" },
              ].map(({ label, name, type = "text" }) => (
                <Grid item xs={12} sm={6} key={name}>
                  <TextField
                    fullWidth
                    required
                    label={label}
                    name={name}
                    type={type}
                    value={formData[name as keyof typeof formData]}
                    onChange={handleChange}
                  />
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

export default PublisherDashboard;
