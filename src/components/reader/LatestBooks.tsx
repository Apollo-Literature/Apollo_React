"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Card, CardContent, CardMedia, Grid, Button, CircularProgress, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

interface Book {
  bookId: number;
  title: string;
  thumbnail?: string; // Optional in case it's missing
}

export default function BestsellingBooks() {
  const theme = useTheme();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/books/all-books");
        console.log("API Response:", response.data); // Debugging log
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

  return (
    <Box sx={{ py: 6 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: "bold" }}>
          Latest Books
        </Typography>
        <Button variant="contained" color="secondary" sx={{ borderRadius: 4, px: 3, py: 1 }}>
          View All
        </Button>
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
                elevation={2}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  bgcolor: theme.palette.background.paper,
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
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
