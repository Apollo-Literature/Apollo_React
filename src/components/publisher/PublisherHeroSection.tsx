import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { uploadBook, BookData } from "../../services/BookService";

function PublisherHeroSection() {
  const [openDialog, setOpenDialog] = useState(false);
  const [bookData, setBookData] = useState<BookData>({
    title: "",
    author: "",
    category: "",
    description: "",
    price: "",
    publishedDate: "",
    isbn: "",
    language: "",
    pageCount: "",
    tags: "",
    visibility: "public",
    thumbnail: null,
    file: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "thumbnail" || e.target.name === "file") {
      setBookData({
        ...bookData,
        [e.target.name]: e.target.files?.[0] || null,
      });
    } else {
      setBookData({ ...bookData, [e.target.name]: e.target.value });
    }
  };

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  const handleFormSubmit = async () => {
    if (!bookData.title || !bookData.author) {
      alert("Please fill all fields!");
      return;
    }
    const success = await uploadBook(bookData);
    if (success) {
      alert("Book uploaded successfully!");
      setBookData({
        title: "",
        author: "",
        category: "",
        description: "",
        price: "",
        publishedDate: "",
        isbn: "",
        language: "",
        pageCount: "",
        tags: "",
        visibility: "public",
        thumbnail: null,
        file: null,
      });
      setOpenDialog(false);
    } else {
      alert("Failed to upload book.");
    }
  };

  return (
    <Box
      sx={{
        py: 20,
        px: 4,
        bgcolor: "primary.main",
        color: "white",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome, Publisher!
      </Typography>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Manage your books, track your sales, and grow your readership.
      </Typography>
      <Button variant="contained" color="secondary" size="large" onClick={handleDialogOpen}>
        Add New Book
      </Button>
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Add New Book</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "grid", gap: 2, py: 2 }}>
            <TextField fullWidth label="Book Title" name="title" value={bookData.title} onChange={handleChange} required />
            <TextField fullWidth label="Author Name" name="author" value={bookData.author} onChange={handleChange} required />
            <TextField fullWidth label="Category" name="category" value={bookData.category} onChange={handleChange} required />
            <TextField fullWidth multiline rows={3} label="Description" name="description" value={bookData.description} onChange={handleChange} required />
            <TextField fullWidth label="Price" type="number" name="price" value={bookData.price} onChange={handleChange} required />
            <TextField fullWidth type="date" name="publishedDate" value={bookData.publishedDate} onChange={handleChange} required InputLabelProps={{ shrink: true }} label="Published Date" />
            <TextField fullWidth label="ISBN" name="isbn" value={bookData.isbn} onChange={handleChange} />
            <TextField fullWidth label="Language" name="language" value={bookData.language} onChange={handleChange} required />
            <TextField fullWidth label="Page Count" type="number" name="pageCount" value={bookData.pageCount} onChange={handleChange} required />
            <TextField fullWidth label="Tags (comma-separated)" name="tags" value={bookData.tags} onChange={handleChange} />
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Book Thumbnail
              </Typography>
              <input type="file" name="thumbnail" accept="image/*" onChange={handleChange} required />
            </Box>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Book File (PDF or EPUB)
              </Typography>
              <input type="file" name="file" accept=".pdf,.epub" onChange={handleChange} required />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">Cancel</Button>
          <Button onClick={handleFormSubmit} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PublisherHeroSection;
