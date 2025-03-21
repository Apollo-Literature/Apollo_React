"use client";

import { useState } from "react";
import { Box, Typography, Container, Grid, Card, CardMedia, CardContent, CardActions, Button, Pagination } from "@mui/material";
import { motion } from "framer-motion";

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
  progress?: string;
}

const books: Book[] = [...Array(20)].map((_, i) => ({
  id: i + 1,
  title: `Book ${i + 1}`,
  author: `Author ${i + 1}`,
  image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg",
}));

const ITEMS_PER_PAGE = 8;

export default function LibraryBooks() {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(books.length / ITEMS_PER_PAGE);

  const displayedBooks = books.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom fontWeight={600}>
        My Library
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {displayedBooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardMedia component="img" image={book.image} alt={book.title} height={200} sx={{ borderRadius: "12px 12px 0 0" }} />
                <CardContent>
                  <Typography variant="h6" fontWeight={500}>{book.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{book.author}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained" sx={{ mx: "auto" }}>Read Now</Button>
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
    </Container>
  );
}