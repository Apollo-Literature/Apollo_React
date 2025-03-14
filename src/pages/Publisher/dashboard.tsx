import { useState } from "react";
import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  type PaletteMode,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Header from "../../components/publisher/Header";
import Footer from "../../components/publisher/Footer";

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
});

const dummyBooks = [
  { id: 1, title: "Book Title 1", author: "Author Name 1", sales: 120 },
  { id: 2, title: "Book Title 2", author: "Author Name 2", sales: 250 },
  { id: 3, title: "Book Title 3", author: "Author Name 3", sales: 80 },
];

const salesData = [
  { month: "Jan", sales: 200, revenue: 4000 },
  { month: "Feb", sales: 350, revenue: 7000 },
  { month: "Mar", sales: 420, revenue: 8400 },
  { month: "Apr", sales: 510, revenue: 10200 },
];

function PublisherHeroSection() {
  const [openDialog, setOpenDialog] = useState(false);
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookSales, setBookSales] = useState("");

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleFormSubmit = () => {
    // Handle form submission (you can process book data here)
    console.log("New Book Added:", {
      title: bookTitle,
      author: bookAuthor,
      sales: bookSales,
    });

    // Reset form fields
    setBookTitle("");
    setBookAuthor("");
    setBookSales("");

    setOpenDialog(false); // Close dialog after submission
  };

  return (
    <Box
      sx={{
        py: 20,
        px: 4,
        bgcolor: "primary.main",
        color: "white",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome, Publisher!
      </Typography>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Manage your books, track your sales, and grow your readership.
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={handleDialogOpen}
      >
        Add New Book
      </Button>

      {/* Dialog for Adding a New Book */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add New Book</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Book Title"
            fullWidth
            variant="outlined"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Author Name"
            fullWidth
            variant="outlined"
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Sales"
            type="number"
            fullWidth
            variant="outlined"
            value={bookSales}
            onChange={(e) => setBookSales(e.target.value)}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function MyBooks() {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Books
      </Typography>
      <Grid container spacing={3}>
        {dummyBooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card>
              <CardMedia
                component="img"
                alt="Book Cover"
                height="180"
                image="/path/to/default/cover.jpg"
              />
              <CardContent>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="subtitle1">by {book.author}</Typography>
                <Typography variant="body2">Sales: {book.sales}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Edit
                </Button>
                <Button size="small" color="primary">
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function SalesAnalytics() {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Sales Analytics
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={salesData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#8884d8"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#82ca9d"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

function PublisherDashboard() {
  const [mode, setMode] = useState<PaletteMode>("light");
  const theme = createTheme(getDesignTokens(mode));

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
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
            <PublisherHeroSection />
            <Container maxWidth="xl" sx={{ py: 4 }}>
              <MyBooks />
              <SalesAnalytics />
            </Container>
          </Container>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default PublisherDashboard;
