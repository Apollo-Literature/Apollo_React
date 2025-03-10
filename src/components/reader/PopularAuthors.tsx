"use client"

import { Box, Typography, Card, CardContent, CardMedia, Grid, IconButton, useTheme } from "@mui/material"
import { ArrowForward as ArrowForwardIcon } from "@mui/icons-material"
import { motion } from "framer-motion"

const MotionCard = motion(Card)

interface Author {
  id: number
  name: string
  reads: string
  image: string
}

const authors: Author[] = [
  {
    id: 1,
    name: "J.K Rowling",
    reads: "20,000 reads this week",
    image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg",
  },
  {
    id: 2,
    name: "George R.R. Martin",
    reads: "18,500 reads this week",
    image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg",
  },
  {
    id: 3,
    name: "Stephen King",
    reads: "17,200 reads this week",
    image: "https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg",
  },
]

export default function PopularAuthors() {
  const theme = useTheme()

  return (
    <Box sx={{ mb: 8, px: { xs: 2, md: 6 } }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 4,
          position: "relative",
          "&::after": {
            content: '""',
            width: 50,
            height: 4,
            bgcolor: theme.palette.primary.main,
            position: "absolute",
            bottom: -6,
            left: "50%",
            transform: "translateX(-50%)",
            borderRadius: 2,
          },
        }}
      >
        Popular Authors
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {authors.map((author, index) => (
          <Grid item key={author.id} xs={12} sm={6} md={4}>
            <MotionCard
              elevation={3}
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                borderRadius: 3,
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.2)",
                },
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: 70,
                  height: 70,
                  borderRadius: "50%",
                  border: `3px solid ${theme.palette.primary.main}`,
                  mr: 2,
                }}
                image={author.image}
                alt={author.name}
              />
              <CardContent sx={{ flex: 1, p: 0 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {author.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {author.reads}
                </Typography>
              </CardContent>
              <IconButton size="medium" color="primary">
                <ArrowForwardIcon fontSize="small" />
              </IconButton>
            </MotionCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
