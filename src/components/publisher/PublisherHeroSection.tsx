/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

// Supabase config
const supabaseUrl = "https://shzfpsvdewmvughchoun.supabase.co";
const supabaseAnonKey = "YOUR_SUPABASE_ANON_KEY";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function PublisherHeroSection() {
  const [openDialog, setOpenDialog] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAlertMessage("You must be logged in to upload a book.");
      setAlertSeverity("error");
      setOpenAlert(true);
    }
  }, []);

  const validateToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 > Date.now();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setBookData((prev) => ({
      ...prev,
      [name]:
        name === "thumbnail" || name === "file" ? files?.[0] || null : value,
    }));
  };

  const uploadToSupabase = async (file: File, bucket: string) => {
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file);
    if (error) throw new Error(error.message);
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  };

  const handleFormSubmit = async () => {
    if (!validateToken()) {
      setAlertMessage("Token expired. Please log in again.");
      setAlertSeverity("error");
      setOpenAlert(true);
      return;
    }

    const {
      title,
      author,
      description,
      publicationDate,
      pageCount,
      language,
      price,
      thumbnail,
      file,
    } = bookData;

    if (
      !title ||
      !author ||
      !description ||
      !publicationDate ||
      !pageCount ||
      !language ||
      !price ||
      !thumbnail ||
      !file
    ) {
      setAlertMessage("Please fill all required fields.");
      setAlertSeverity("error");
      setOpenAlert(true);
      return;
    }

    setIsUploading(true);
    try {
      const token = localStorage.getItem("token");

      const thumbnailUrl = await uploadToSupabase(thumbnail, "thumbnails");
      const fileUrl = await uploadToSupabase(file, "books");

      const response = await axios.post(
        "https://crucial-lane-apollolibrary-9e92f19f.koyeb.app/api/v1/books/add-book",
        {
          title,
          author,
          description,
          isbn: bookData.isbn,
          publicationDate,
          pageCount: parseInt(pageCount),
          language,
          price: parseFloat(price),
          thumbnailUrl,
          fileUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setAlertMessage("Book uploaded successfully!");
        setAlertSeverity("success");
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
        setOpenDialog(false);
      } else {
        throw new Error("Upload failed");
      }
    } catch (err: any) {
      console.error(err);
      setAlertMessage(err.message || "Upload failed. Please try again.");
      setAlertSeverity("error");
    } finally {
      setIsUploading(false);
      setOpenAlert(true);
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
        Add your new books and grow your readership.
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpenDialog(true)}
      >
        Add New Book
      </Button>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add New Book</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "grid", gap: 2, py: 2 }}>
            <TextField
              label="Title"
              name="title"
              fullWidth
              value={bookData.title}
              onChange={handleChange}
              required
            />
            <TextField
              label="Author"
              name="author"
              fullWidth
              value={bookData.author}
              onChange={handleChange}
              required
            />
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={3}
              value={bookData.description}
              onChange={handleChange}
              required
            />
            <TextField
              label="ISBN"
              name="isbn"
              fullWidth
              value={bookData.isbn}
              onChange={handleChange}
            />
            <TextField
              label="Publication Date"
              name="publicationDate"
              type="date"
              fullWidth
              value={bookData.publicationDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Page Count"
              name="pageCount"
              type="number"
              fullWidth
              value={bookData.pageCount}
              onChange={handleChange}
              required
            />
            <TextField
              label="Language"
              name="language"
              fullWidth
              value={bookData.language}
              onChange={handleChange}
              required
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              fullWidth
              value={bookData.price}
              onChange={handleChange}
              required
            />
            <Box>
              <Typography variant="subtitle2">
                Cover Image (JPEG/PNG)
              </Typography>
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={handleChange}
                required
              />
            </Box>
            <Box>
              <Typography variant="subtitle2">Book File (PDF/EPUB)</Typography>
              <input
                type="file"
                name="file"
                accept=".pdf,.epub"
                onChange={handleChange}
                required
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} disabled={isUploading}>
            Cancel
          </Button>
          <Button
            onClick={handleFormSubmit}
            variant="contained"
            disabled={isUploading}
            startIcon={isUploading ? <CircularProgress size={20} /> : null}
          >
            {isUploading ? "Uploading..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => setOpenAlert(false)}
      >
        <Alert
          onClose={() => setOpenAlert(false)}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default PublisherHeroSection;
