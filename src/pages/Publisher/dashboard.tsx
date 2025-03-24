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

// Define the form data interface for type safety
interface BookFormData {
  title: string;
  author: string;
  description: string;
  isbn: string;
  publicationDate: string;
  pageCount: string;
  language: string;
  price: string;
  thumbnail: string;
  url: string;
}

function PublisherDashboard() {
  const [mode, setMode] = useState<PaletteMode>("light");
  const theme = createTheme(getDesignTokens(mode));
  const toggleColorMode = () =>
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<BookFormData>({
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

    // Validate form data
    if (!formData.title || !formData.author) {
      setError("Title and Author are required fields");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token || token === "null") {
      setError("Missing authentication token. Please log in again.");
      return;
    }

    try {
      const payload = {
        ...formData,
        pageCount: formData.pageCount ? parseInt(formData.pageCount, 10) : 0,
        price: formData.price ? parseFloat(formData.price) : 0,
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
      setFormData({
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
      setTimeout(() => {
        setOpen(false);
        window.location.reload();
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Failed to add book.");
    }
  };

  const formFields = [
    { label: "Title", name: "title" },
    { label: "Author", name: "author" },
    { label: "Description", name: "description", multiline: true, rows: 4 },
    { label: "ISBN", name: "isbn" },
    { label: "Publication Date", name: "publicationDate", type: "date", InputLabelProps: { shrink: true } },
    { label: "Page Count", name: "pageCount", type: "number" },
    { label: "Language", name: "language" },
    { label: "Price", name: "price", type: "number", step: "0.01" },
    { label: "Thumbnail URL", name: "thumbnail" },
    { label: "Book File URL", name: "url" },
  ];

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
            <Box sx={{ py: 6, px: 4, textAlign: "center" }}>
              <br></br>
              <br></br>
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

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 4 }}>
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
        
        <Footer />

        {/* Add Book Dialog */}
        <Dialog 
          open={open} 
          onClose={() => setOpen(false)} 
          fullWidth 
          maxWidth="md"
          PaperProps={{
            sx: { maxHeight: "90vh" }
          }}
        >
          <DialogTitle>Add New Book</DialogTitle>
          <DialogContent dividers>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <Grid container spacing={2}>
              {formFields.map(({ label, name, type = "text", multiline = false, rows = 1, InputLabelProps = {} }) => (
                <Grid item xs={12} sm={name === "description" ? 12 : 6} key={name}>
                  <TextField
                    fullWidth
                    required={name === "title" || name === "author"}
                    label={label}
                    name={name}
                    type={type}
                    multiline={multiline}
                    rows={rows}
                    InputLabelProps={InputLabelProps}
                    value={formData[name as keyof BookFormData]}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
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