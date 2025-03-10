import { useState } from "react";
import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  type PaletteMode,
  Typography, // Import Typography
  Button, // For demo buttons in new components
  Grid, //for layout
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import Header from "../../components/reader/Header"; // Reuse the same header, assuming it's adaptable.
import Footer from "../../components/reader/Footer"; // Reuse the same footer

// --- Start of Reusable Theme Configuration ---
const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#6247aa",
          },
          secondary: {
            main: "#ff7f7f",
          },
          background: {
            default: "#f0f4f8",
            paper: "#ffffff",
          },
        }
      : {
          primary: {
            main: "#9d8cd6",
          },
          secondary: {
            main: "#ff9999",
          },
          background: {
            default: "#1a1a2e",
            paper: "#16213e",
          },
        }),
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
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
// --- End of Reusable Theme Configuration ---

// --- Start of Publisher-Specific Components ---

// Placeholder data - replace this.
const dummyBooks = [
    { id: 1, title: "Book Title 1", author: "Author Name 1", sales: 120 },
    { id: 2, title: "Book Title 2", author: "Author Name 2", sales: 250 },
    { id: 3, title: "Book Title 3", author: "Author Name 3", sales: 80 },
  ];

const dummySalesData = [
    { month: 'Jan', sales: 200 },
    { month: 'Feb', sales: 350 },
    { month: 'Mar', sales: 420 },
    { month: 'Apr', sales: 510 },
];
function PublisherHeroSection() {
  return (
    <Box
      sx={{
        py: 8,
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
       <Button variant="contained" color="secondary">
          Add New Book
        </Button>
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
        <Grid container spacing={2}>
          {dummySalesData.map((data, index) => (
             <Grid item xs={3} key={index}>
             <Card>
                <CardContent>
                <Typography variant="h6">{data.month}</Typography>
                <Typography variant="body2">{data.sales} Sales</Typography>
                </CardContent>
            </Card>

           </Grid>
          ))}
        </Grid>
        {/* Add charting library here for visual representation */}
      </Box>
    );
  }
// --- End of Publisher-Specific Components ---

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
              {/* <AuthorCollaborations />  Add if needed */}
            </Container>
          </Container>
        </Box>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default PublisherDashboard;