"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Stack,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

interface Book {
  bookId: number;
  title: string;
  author: string;
  thumbnail?: string; // Optional in case it's missing
}

export default function BestsellingBooks() {
  const theme = useTheme();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [openBuyPopup, setOpenBuyPopup] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/books/all-books");
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
          setBooks(response.data);
        } else {
          setError("Invalid API response format.");
        }
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to load books. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleBuyBook = (book: Book) => {
    setSelectedBook(book);
    setOpenBuyPopup(true);
  };

  const confirmPurchase = () => {
    if (selectedBook) {
      alert(`You have successfully bought "${selectedBook.title}"!`);
      setOpenBuyPopup(false);
    }
  };

  return (
    <Box sx={{ py: 6 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: "bold" }}>
          Latest Books
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ textAlign: "center", mt: 4 }}>
          {error}
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {books.map((book, index) => (
            <Grid item key={book.bookId} xs={12} sm={6} md={4} lg={3}>
              <MotionCard
                elevation={3}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  bgcolor: theme.palette.background.paper,
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.2)",
                  },
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <CardMedia
                  component="img"
                  image={book.thumbnail || "https://via.placeholder.com/250"} // Fallback image
                  alt={book.title}
                  sx={{
                    height: 250,
                    objectFit: "cover",
                  }}
                />
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Typography variant="subtitle1" component="div" sx={{ fontWeight: "medium", mb: 0.5 }}>
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    by {book.author}
                  </Typography>
                </CardContent>

                {/* View & Buy Buttons */}
                <Stack direction="row" spacing={1} sx={{ p: 2, justifyContent: "center" }}>
                  <Button variant="outlined" color="primary" size="small" sx={{ flex: 1 }}>
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ flex: 1 }}
                    onClick={() => handleBuyBook(book)}
                  >
                    Buy
                  </Button>
                </Stack>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Buy Book Confirmation Popup */}
      <Dialog open={openBuyPopup} onClose={() => setOpenBuyPopup(false)} maxWidth="sm" fullWidth>
        {selectedBook && (
          <>
            <DialogTitle>Confirm Purchase</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to buy "<strong>{selectedBook.title}</strong>" by{" "}
                <strong>{selectedBook.author}</strong>?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenBuyPopup(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={confirmPurchase} color="secondary" variant="contained">
                Buy Now
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
