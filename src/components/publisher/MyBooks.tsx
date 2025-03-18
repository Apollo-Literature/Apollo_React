"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { getBooks } from "../../services/BookService";

interface Book {
  id: number;
  title: string;
  author: string;
  sales: number;
  thumbnail?: string;
}

export default function MyBooks() {
  const theme = useTheme();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  const handleEditClick = (book: Book) => {
    setSelectedBook(book);
    setIsEditMode(true);
  };

  const handleViewDetailsClick = (book: Book) => {
    setSelectedBook(book);
    setOpenViewDialog(true);
  };

  const handleEditSave = async () => {
    if (selectedBook) {
      try {
        await updateBook(selectedBook);
        setBooks((prevBooks) =>
          prevBooks.map((b) => (b.id === selectedBook.id ? selectedBook : b))
        );
        alert("Book updated successfully!");
      } catch (err) {
        console.error("Update error:", err);
        alert("Failed to update book. Please try again.");
      }
      setIsEditMode(false);
    }
  };

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 6 } }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
        My Books
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ textAlign: "center", mt: 4 }}>
          {error}
        </Typography>
      ) : books.length === 0 ? (
        <Typography sx={{ textAlign: "center", mt: 4 }}>No books found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  bgcolor: theme.palette.background.paper,
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                {book.thumbnail && (
                  <CardMedia
                    component="img"
                    alt="Book Cover"
                    height="180"
                    image={book.thumbnail}
                    sx={{ objectFit: "cover" }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {book.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    by {book.author}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Sales: {book.sales}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                  <Button size="small" color="primary" variant="outlined" onClick={() => handleEditClick(book)}>
                    Edit
                  </Button>
                  <Button size="small" color="secondary" variant="contained" onClick={() => handleViewDetailsClick(book)}>
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Edit Book Modal */}
      <Dialog open={isEditMode} onClose={() => setIsEditMode(false)} maxWidth="sm" fullWidth>
        {selectedBook && (
          <>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Title"
                value={selectedBook.title}
                onChange={(e) => setSelectedBook({ ...selectedBook, title: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Author"
                value={selectedBook.author}
                onChange={(e) => setSelectedBook({ ...selectedBook, author: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Sales"
                type="number"
                value={selectedBook.sales}
                onChange={(e) => setSelectedBook({ ...selectedBook, sales: Number(e.target.value) })}
                sx={{ mb: 2 }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsEditMode(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={handleEditSave} color="primary" variant="contained">
                Save Changes
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* View Details Modal */}
      <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} maxWidth="sm" fullWidth>
        {selectedBook && (
          <>
            <DialogTitle>Book Details</DialogTitle>
            <DialogContent>
              {selectedBook.thumbnail && (
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <CardMedia
                    component="img"
                    alt={selectedBook.title}
                    image={selectedBook.thumbnail}
                    sx={{ width: "100%", maxHeight: 250, objectFit: "cover", borderRadius: 2 }}
                  />
                </Box>
              )}
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {selectedBook.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                by {selectedBook.author}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Sales: {selectedBook.sales}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenViewDialog(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
function updateBook(_selectedBook: Book) {
  throw new Error("Function not implemented.");
}

