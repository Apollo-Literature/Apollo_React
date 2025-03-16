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
} from "@mui/material";
import { getBooks } from "../../services/BookService";

function MyBooks() {
  const [books, setBooks] = useState<
    { id: number; title: string; author: string; sales: number; thumbnail?: string }[]
  >([]);

  useEffect(() => {
    async function fetchBooks() {
      const data = await getBooks();
      setBooks(data);
    }
    fetchBooks();
  }, []);

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Books
      </Typography>
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card>
              {book.thumbnail && (
                <CardMedia component="img" alt="Book Cover" height="180" image={book.thumbnail} />
              )}
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

export default MyBooks;