import { useState } from "react";
import axios from "axios";
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

function PublisherHeroSection() {
  const [openDialog, setOpenDialog] = useState(false);
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    description: "",
    isbn: "",
    publicationDate: "",
    pageCount: "",
    language: "",
    price: "",
    thumbnail: null as File | null,
    file: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail" || name === "file") {
      setBookData((prev) => ({ ...prev, [name]: files?.[0] || null }));
    } else {
      setBookData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  const handleFormSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to upload a book.");
      return;
    }

    // Validate required fields
    const {
      title, author, description, publicationDate, pageCount, language, price, thumbnail, file,
    } = bookData;

    if (!title || !author || !description || !publicationDate || !pageCount || !language || !price || !thumbnail || !file) {
      alert("Please fill in all fields and upload the files.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("description", description);
      formData.append("isbn", bookData.isbn);
      formData.append("publicationDate", publicationDate);
      formData.append("pageCount", pageCount.toString());
      formData.append("language", language);
      formData.append("price", price.toString());
      formData.append("thumbnail", thumbnail);
      formData.append("file", file); // This is the PDF/EPUB

      const response = await axios.post("http://localhost:8080/api/v1/books/add-book", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert("✅ Book uploaded successfully!");
        setOpenDialog(false);
        setBookData({
          title: "",
          author: "",
          description: "",
          isbn: "",
          publicationDate: "",
          pageCount: "",
          language: "",
          price: "",
          thumbnail: null,
          file: null,
        });
      } else {
        alert("❌ Upload failed. Please try again.");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error uploading:", error.response?.data || error.message);
      alert("❌ Failed to upload book. Please check your inputs and try again.");
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
        Add your new books to the system and share with readers.
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleDialogOpen}>
        Add New Book
      </Button>

      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Add New Book</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "grid", gap: 2, py: 2 }}>
            <TextField label="Title" name="title" fullWidth value={bookData.title} onChange={handleChange} required />
            <TextField label="Author" name="author" fullWidth value={bookData.author} onChange={handleChange} required />
            <TextField label="Description" name="description" fullWidth multiline rows={3} value={bookData.description} onChange={handleChange} required />
            <TextField label="ISBN" name="isbn" fullWidth value={bookData.isbn} onChange={handleChange} />
            <TextField label="Publication Date" name="publicationDate" type="date" fullWidth value={bookData.publicationDate} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
            <TextField label="Page Count" name="pageCount" type="number" fullWidth value={bookData.pageCount} onChange={handleChange} required />
            <TextField label="Language" name="language" fullWidth value={bookData.language} onChange={handleChange} required />
            <TextField label="Price" name="price" type="number" fullWidth value={bookData.price} onChange={handleChange} required />
            <Box>
              <Typography variant="subtitle2">Cover Image (JPEG/PNG)</Typography>
              <input type="file" name="thumbnail" accept="image/*" onChange={handleChange} required />
            </Box>
            <Box>
              <Typography variant="subtitle2">Book File (PDF/EPUB)</Typography>
              <input type="file" name="file" accept=".pdf,.epub" onChange={handleChange} required />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleFormSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PublisherHeroSection;
