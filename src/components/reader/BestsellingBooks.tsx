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
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

const MotionCard = motion(Card);

interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  downloadUrl: string;
}

export default function BestsellingBooks() {
  const theme = useTheme();
  const [books, setBooks] = useState<Book[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [openBuyPopup, setOpenBuyPopup] = useState(false);

  const displayedBooks = showAll ? books : books.slice(0, 5);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/books/all?page=0&size=30&sort=title,asc"
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fetchedBooks = ((response.data as { content: any[] }).content || []).map((book: any) => ({
          id: book.id,
          title: book.title,
          author: book.author,
          coverImage: book.coverImage || "https://via.placeholder.com/150",
          downloadUrl: book.downloadUrl || "#",
        }));
        setBooks(fetchedBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
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

  const downloadBook = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "";
    link.target = "_blank";
    link.click();
  };

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
        <Button
          variant="contained"
          color="secondary"
          sx={{ borderRadius: 4, px: 3, py: 1 }}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "View All"}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {displayedBooks.map((book, index) => (
          <Grid item key={book.id} xs={6} sm={4} md={2.4}>
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
                image={book.coverImage}
                alt={book.title}
                sx={{ height: 250, objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "medium", mb: 0.5 }}>
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  by {book.author}
                </Typography>
              </CardContent>

              <Stack direction="row" spacing={1} sx={{ p: 2, justifyContent: "center" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  sx={{ flex: 1 }}
                  onClick={() => downloadBook(book.downloadUrl)}
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
            <DialogContent>
              <Typography>
                Are you sure you want to buy "
                <strong>{selectedBook.title}</strong>" by{" "}
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
