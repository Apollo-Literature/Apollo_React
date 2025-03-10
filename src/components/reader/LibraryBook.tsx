"use client";

import { Box, Typography, Container, Divider } from "@mui/material";

interface Book {
  id: number;
  title: string;
  imageUrl: string;
  progress: {
    current: number;
    total: number;
  };
}

const BookItem = ({ book, index }: { book: Book; index: number }) => (
  <>
    <Container
      maxWidth="xl"
      sx={{
        py: 3,
        display: "flex",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Typography variant="body1" color="inherit">
        {index + 1}.
      </Typography>
      <img
        src={book.imageUrl}
        alt={book.title}
        height={150}
        style={{ borderRadius: 8 }}
      />
      <Typography
        variant="body1"
        color="inherit"
        sx={{
          maxWidth: 400,
          lineHeight: 1.5,
          whiteSpace: "normal",
        }}
      >
        {book.title}
        {book.progress && (
          <Box component="div" sx={{ mt: 1 }}>
            Progress: {book.progress.current}/{book.progress.total}
          </Box>
        )}
      </Typography>
    </Container>
    <Divider orientation="horizontal" />
  </>
);

const books: Book[] = [
  {
    id: 1,
    title: "Harry Potter and the Philosopher's stone",
    imageUrl:
      "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg",
    progress: {
      current: 100,
      total: 1000,
    },
  },
  // Add more books here as needed
];

export default function LibraryBooks() {
  return (
    <>
      <Typography variant="h3" color="inherit">
        My library
      </Typography>
      <Box sx={{ height: 2000, overflow: "auto" }}>
        {books.map((book, index) => (
          <BookItem key={book.id} book={book} index={index} />
        ))}
      </Box>
    </>
  );
}
