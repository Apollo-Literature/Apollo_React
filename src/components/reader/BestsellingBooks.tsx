/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  CircularProgress,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

const MotionCard = motion(Card);

interface Book {
  bookId: number;
  title: string;
  author: string;
  description: string;
  isbn: string;
  publicationDate: string;
  pageCount: number;
  language: string;
  price: number;
  thumbnail: string; // Thumbnail URL
  url: string; // Download URL
}

export default function BestsellingBooks() {
  const theme = useTheme();
  const [books, setBooks] = useState<Book[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [openBuyPopup, setOpenBuyPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const displayedBooks = showAll ? books : books.slice(0, 5);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        interface ApiResponse {
          content: {
            bookId: number;
            title?: string;
            author?: string;
            description?: string;
            isbn?: string;
            publicationDate?: string;
            pageCount?: number;
            language?: string;
            price?: number;
            thumbnail?: string;
            url?: string;
          }[];
        }

        const response = await axios.get<ApiResponse>(
          "https://crucial-lane-apollolibrary-9e92f19f.koyeb.app/api/v1/books/all",
          {
            params: {
              page: 0,
              size: 30,
              sort: "title,asc"
            }
          }
        );

        // Check if response data has the expected structure
        if (response.data.content) {
          const fetchedBooks = response.data.content.map((book: any) => ({
            bookId: book.bookId,
            title: book.title || "Unknown Title",
            author: book.author || "Unknown Author",
            description: book.description || "",
            isbn: book.isbn || "",
            publicationDate: book.publicationDate || "",
            pageCount: book.pageCount || 0,
            language: book.language || "",
            price: book.price || 0,
            thumbnail: book.thumbnail || "https://via.placeholder.com/150x220?text=No+Image", 
            url: book.url || "#",
          }));
          setBooks(fetchedBooks);
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Failed to load books. Please try again later.");
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

  const confirmPurchase = async () => {
    if (selectedBook) {
      try {
        // Here you would normally make an API call to process the purchase
        // For now we'll just show a success message
        alert(`You have successfully bought "${selectedBook.title}" for $${selectedBook.price.toFixed(2)}!`);
        setOpenBuyPopup(false);
      } catch (error) {
        console.error("Error processing purchase:", error);
        alert("Failed to process purchase. Please try again.");
      }
    }
  };

  const downloadBook = (book: Book) => {
    if (!book.url || book.url === "#") {
      alert("This book is not available for download.");
      return;
    }

    try {
      // Create a download link
      const link = document.createElement("a");
      link.href = book.url;
      link.setAttribute("download", `${book.title}.pdf`); // Assuming PDF format
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading book:", error);
      alert("Failed to download the book. Please try again.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 6, px: { xs: 2, md: 6 } }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (books.length === 0) {
    return (
      <Box sx={{ py: 6, px: { xs: 2, md: 6 } }}>
        <Typography variant="h6" align="center">No books available at the moment.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 6, px: { xs: 2, md: 6 } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h2" sx={{ fontWeight: "bold" }}>
          Books
        </Typography>
        {books.length > 5 && (
          <Button
            variant="contained"
            color="secondary"
            sx={{ borderRadius: 4, px: 3, py: 1 }}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View All"}
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {displayedBooks.map((book, index) => (
          <Grid item key={book.bookId || index} xs={12} sm={6} md={4} lg={2.4}>
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
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <CardMedia
                component="img"
                image={book.thumbnail || "https://via.placeholder.com/150x220?text=No+Image"}
                alt={book.title}
                sx={{ height: 250, objectFit: "cover" }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "https://via.placeholder.com/150x220?text=Error+Loading+Image";
                }}
              />
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "medium", mb: 0.5 }}
                  title={book.title}
                  noWrap
                >
                  {book.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  noWrap
                  title={`by ${book.author}`}
                >
                  by {book.author}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="primary"
                  sx={{ mt: 1, fontWeight: "bold" }}
                >
                  ${book.price.toFixed(2)}
                </Typography>
              </CardContent>

              <Stack
                direction="row"
                spacing={1}
                sx={{ p: 2, justifyContent: "center" }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  sx={{ flex: 1 }}
                  onClick={() => downloadBook(book)}
                >
                  Read
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

      {/* Buy Confirmation Popup */}
      <Dialog
        open={openBuyPopup}
        onClose={() => setOpenBuyPopup(false)}
        maxWidth="sm"
        fullWidth
      >
        {selectedBook && (
          <>
            <DialogTitle>Confirm Purchase</DialogTitle>
            <DialogContent dividers>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, mb: 2 }}>
                <Box sx={{ width: { xs: '100%', sm: '150px' }, flexShrink: 0 }}>
                  <img 
                    src={selectedBook.thumbnail || "https://via.placeholder.com/150x220?text=No+Image"}
                    alt={selectedBook.title}
                    style={{ width: '100%', height: 'auto', maxHeight: '200px', objectFit: 'cover' }}
                  />
                </Box>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {selectedBook.title}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    by <strong>{selectedBook.author}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {selectedBook.description ? 
                      (selectedBook.description.length > 200 ? 
                        selectedBook.description.substring(0, 200) + '...' : 
                        selectedBook.description) : 
                      'No description available.'}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                    Price: ${selectedBook.price.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Are you sure you want to purchase this book?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenBuyPopup(false)} color="primary">
                Cancel
              </Button>
              <Button
                onClick={confirmPurchase}
                color="secondary"
                variant="contained"
              >
                Buy Now
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}