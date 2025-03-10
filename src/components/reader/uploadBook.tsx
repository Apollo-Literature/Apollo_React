import {Box, Typography, TextField, Button, Divider, } from '@mui/material'
import UploadIcon from "@mui/icons-material/Upload"; 
import { useState } from 'react';

export default function UploadBook() {
    const [newBook, setNewBook] = useState({
        nameofBook: "",
        noOfPages: 0,
        file: null as File | null,
    });

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setNewBook({ ...newBook, file: event.target.files[0] });
        }
    };

    const handleUpload = () => {
        // Handle book upload logic here 
        console.log("Uploading book:", newBook);
        alert("Book uploaded successfully!");
        setNewBook({ nameofBook: "", noOfPages: 0, file: null });
    };
    
    return (

        
    <>
     {/* Divider */}
     <Divider sx={{ my: 2 }} />

{/* Book Upload Section */}
<Typography variant="h3" color="inherit">
    Upload a New Book
</Typography>
<Box
    component="form"
    sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 3,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 1,
    }}
>
    <TextField
        label="Book Title"
        value={newBook.nameofBook}
        onChange={(e) => setNewBook({ ...newBook, nameofBook: e.target.value })}
        fullWidth
    />
    <TextField
        label="Number of Pages"
        type="number"
        value={newBook.noOfPages}
        onChange={(e) => setNewBook({ ...newBook, noOfPages: parseInt(e.target.value) })}
        fullWidth
    />
    <Button
        variant="contained"
        component="label"
        startIcon={<UploadIcon />}
    >
        Upload Book File
        <input
            type="file"
            hidden
            accept=".pdf,.epub"
            onChange={handleFileUpload}
        />
    </Button>
    {newBook.file && (
        <Typography variant="body1" color="inherit">
            Selected File: {newBook.file.name}
        </Typography>
    )}
    <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!newBook.nameofBook || !newBook.file}
    >
        Upload Book
    </Button>
</Box></>

    )
}