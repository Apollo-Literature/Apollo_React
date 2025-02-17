import { useState } from 'react'
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material'
import { Search } from '@mui/icons-material'
import BookCard from '../components/BookCard'
import { Book } from '../types'

const mockBooks: Book[] = [
  // ... same mock books as Home page
]

export default function Library() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('title')
  const [filterCategory, setFilterCategory] = useState('all')

  const handleAIFeatureClick = (feature: string) => {
    console.log(`AI feature clicked: ${feature}`)
    // Implement AI feature logic
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Library
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="author">Author</MenuItem>
                <MenuItem value="date">Publication Date</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={filterCategory}
                label="Category"
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="fiction">Fiction</MenuItem>
                <MenuItem value="non-fiction">Non-Fiction</MenuItem>
                <MenuItem value="technology">Technology</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {mockBooks.map((book) => (
            <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
              <BookCard book={book} onAIFeatureClick={handleAIFeatureClick} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}