"use client"

import { Box, Typography, Card, CardContent, CardMedia, Grid, Button, useTheme } from "@mui/material"
import { motion } from "framer-motion"

const MotionCard = motion(Card)

interface Book {
  id: number
  title: string
  author: string
  image: string
}

// Using Unsplash source for random book covers
const books: Book[] = [
  {
    id: 1,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K Rowling",
    image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg",
  },
  {
    id: 2,
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K Rowling",
    image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg",
  },
  {
    id: 3,
    title: "Harry Potter and the Prisoner of Azkaban",
    author: "J.K Rowling",
    image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg",
  },
  {
    id: 4,
    title: "Harry Potter and the Goblet of Fire",
    author: "J.K Rowling",
    image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg",
  },
  {
    id: 5,
    title: "Harry Potter and the Order of Phoenix",
    author: "J.K Rowling",
    image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg",
  },
]

export default function BestsellingBooks() {
  const theme = useTheme()

  return (
    <Box sx={{ py: 6 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: "bold",
          }}
        >
          Bestselling Books
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          sx={{
            borderRadius: 4,
            px: 3,
            py: 1,
          }}
        >
          View All
        </Button>
      </Box>

      <Grid container spacing={3}>
        {books.map((book, index) => (
          <Grid item key={book.id} xs={6} sm={4} md={2.4}>
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
                image={book.image}
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
            </MotionCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
