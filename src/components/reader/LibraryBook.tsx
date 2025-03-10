"use client";

import { useState } from "react";
<<<<<<< HEAD
import { Box, Typography, Container, Divider, Pagination, Button } from "@mui/material";
=======
import { Box, Typography, Container, Grid, Card, CardMedia, CardContent, CardActions, Button, Pagination } from "@mui/material";
import { motion } from "framer-motion";
>>>>>>> 6c975db697c71bd724e2e7c1f02bab8cd6958bd1

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
  progress?: string;
}

<<<<<<< HEAD
const books: Book[] = [
  { id: 1, title: "Harry Potter and the Philosopher's Stone", author: "J.K Rowling", image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg" },
  { id: 2, title: "Harry Potter and the Chamber of Secrets", author: "J.K Rowling", image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg" },
  { id: 3, title: "The Hobbit", author: "J.R.R. Tolkien", image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg" },
  { id: 4, title: "1984", author: "George Orwell", image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg" },
  { id: 5, title: "The Great Gatsby", author: "F. Scott Fitzgerald", image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg" },
  { id: 6, title: "Moby-Dick", author: "Herman Melville", image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg" },
  { id: 7, title: "Pride and Prejudice", author: "Jane Austen", image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg" },
  { id: 8, title: "To Kill a Mockingbird", author: "Harper Lee", image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg" },
  { id: 9, title: "War and Peace", author: "Leo Tolstoy", image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg" },
  { id: 10, title: "The Catcher in the Rye", author: "J.D. Salinger", image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg" },
  { id: 11, title: "Crime and Punishment", author: "Fyodor Dostoevsky", image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg" },
  { id: 12, title: "The Brothers Karamazov", author: "Fyodor Dostoevsky", image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg" },
  { id: 13, title: "Brave New World", author: "Aldous Huxley", image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg" },
  { id: 14, title: "The Lord of the Rings", author: "J.R.R. Tolkien", image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg" },
  { id: 15, title: "Fahrenheit 451", author: "Ray Bradbury", image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg" },
  { id: 16, title: "The Alchemist", author: "Paulo Coelho", image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg" },
  { id: 17, title: "The Divine Comedy", author: "Dante Alighieri", image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg" },
  { id: 18, title: "Meditations", author: "Marcus Aurelius", image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg" },
  { id: 19, title: "Don Quixote", author: "Miguel de Cervantes", image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg" },
  { id: 20, title: "Anna Karenina", author: "Leo Tolstoy", image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg" }
];

const ITEMS_PER_PAGE = 10;
=======
const books: Book[] = [...Array(20)].map((_, i) => ({
  id: i + 1,
  title: `Book ${i + 1}`,
  author: `Author ${i + 1}`,
  image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg",
}));

const ITEMS_PER_PAGE = 8;
>>>>>>> 6c975db697c71bd724e2e7c1f02bab8cd6958bd1

export default function LibraryBooks() {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(books.length / ITEMS_PER_PAGE);

  const displayedBooks = books.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
<<<<<<< HEAD
    <>
      <Typography variant="h3" color="inherit">My Library</Typography>
      <Box sx={{ height: "auto", overflow: "auto", p: 3 }}>
        {displayedBooks.map((book, index) => (
          <>
            <Container
              key={book.id}
              maxWidth="xl"
              sx={{
                py: 3,
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Typography variant="body1" color="inherit">{(page - 1) * ITEMS_PER_PAGE + index + 1}.</Typography>
              <img
                src={book.image}
                alt={book.title}
                height={150}
                style={{ borderRadius: 8 }}
              />
              <Typography
                variant="body1"
                color="inherit"
                sx={{ maxWidth: 400, lineHeight: 1.5, whiteSpace: "normal" }}
              >
                <b>{book.title}</b> <br />
                {book.author}
                {book.progress && <><br />Progress: {book.progress}</>}
              </Typography>
              <Button>Read Now</Button>
            </Container>
            {index < displayedBooks.length - 1 && <Divider orientation="horizontal" />}
          </>
        ))}
        
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_event, value) => setPage(value)}
            color="primary"
          />
        </Box>
      </Box>
    </>
=======
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
>>>>>>> 6c975db697c71bd724e2e7c1f02bab8cd6958bd1
  );
}