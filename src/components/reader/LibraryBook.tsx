"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Pagination,
  CircularProgress,
  Alert,
  Dialog,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

interface Book {
  bookId: number;
  title: string;
  author: string;
  thumbnail: string;
  url: string;
}

const ITEMS_PER_PAGE = 8;

export default function LibraryBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openReader, setOpenReader] = useState(false);
  const [selectedBookUrl, setSelectedBookUrl] = useState<string | null>(null);

  const pageCount = Math.ceil(books.length / ITEMS_PER_PAGE);
  const displayedBooks = books.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        interface ApiResponse {
          content: {
            bookId: number;
            title: string;
            author: string;
            thumbnail: string;
            url: string;
          }[];
        }

        const response = await axios.get<ApiResponse>(
          "https://crucial-lane-apollolibrary-9e92f19f.koyeb.app/api/v1/books/all",
          {
            params: {
              page: 0,
              size: 100,
              sort: "title,asc",
            },
          }
        );

        const fetchedBooks = response.data.content.map((book) => ({
          bookId: book.bookId,
          title: book.title || "Unknown Title",
          author: book.author || "Unknown Author",
          thumbnail:
            book.thumbnail ||
            "https://via.placeholder.com/150x220?text=No+Image",
          url: book.url || "#",
        }));

        setBooks(fetchedBooks);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleReadNow = (book: Book) => {
    if (!book.url || book.url === "#") {
      alert("This book is not available for reading.");
      return;
    }
    setSelectedBookUrl(book.url);
    setOpenReader(true);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom fontWeight={600}>
        My Library
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {displayedBooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book.bookId}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  image={book.thumbnail}
                  alt={book.title}
                  height={200}
                  sx={{ borderRadius: "12px 12px 0 0" }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight={500} noWrap>
                    {book.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap
                    title={book.author}
                  >
                    {book.author}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ mx: "auto" }}
                    onClick={() => handleReadNow(book)}
                  >
                    Read Now
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>

      {/* PDF Reader Dialog */}
      <Dialog
        open={openReader}
        onClose={() => setOpenReader(false)}
        fullScreen
        sx={{ zIndex: 1300 }}
      >
        <Box sx={{ p: 2, bgcolor: "#000", height: "100vh" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h6" color="white">
              PDF Reader
            </Typography>
            <Button onClick={() => setOpenReader(false)} variant="contained" color="secondary">
              Close
            </Button>
          </Box>
          <iframe
            src={selectedBookUrl ?? ""}
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="PDF Reader"
          ></iframe>
        </Box>
      </Dialog>
    </Container>
  );
}
