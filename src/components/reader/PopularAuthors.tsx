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
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 2,
    name: "George R.R. Martin",
    reads: "18,500 reads this week",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 3,
    name: "Stephen King",
    reads: "17,200 reads this week",
    image: "/placeholder.svg?height=50&width=50",
  },
]

export default function PopularAuthors() {
  const theme = useTheme()

  return (
    <Box sx={{ mb: 6 }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: "bold",
          mb: 4,
          textAlign: "center",
        }}
      >
        Popular Authors
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {authors.map((author, index) => (
          <Grid item key={author.id} xs={12} sm={6} md={4}>
            <MotionCard
              elevation={2}
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                bgcolor: theme.palette.background.paper,
                borderRadius: 2,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <CardMedia
                component="img"
                sx={{ width: 60, height: 60, borderRadius: "50%", mr: 2 }}
                image={author.image}
                alt={author.name}
              />
              <CardContent sx={{ flex: 1, p: 0 }}>
                <Typography variant="h6" component="div">
                  {author.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {author.reads}
                </Typography>
              </CardContent>
              <IconButton size="small" color="primary">
                <ArrowForwardIcon />
              </IconButton>
            </MotionCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

