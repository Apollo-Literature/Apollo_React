import {Box, Typography, Divider, Grid, } from '@mui/material'

interface Book {
    bookId: number;
    nameofBook: string;
    noOfViews: number;
    noOfLikes: number;
    noOfPages: number;
    noOfDownloads: number;
    averageReadingTime?: string; // Optional field for engagement stats
}

const books: Book[] = [
    {
        bookId: 1,
        nameofBook: "Harry Potter and the Half-Blood Prince",
        noOfViews: 100,
        noOfLikes: 4,
        noOfPages: 1000,
        noOfDownloads: 50,
        averageReadingTime: "2 hours",
    },
    {
        bookId: 2,
        nameofBook: "Harry Potter and the Philosopher's Stone",
        noOfViews: 200,
        noOfLikes: 10,
        noOfPages: 500,
        noOfDownloads: 100,
        averageReadingTime: "1.5 hours",
    },
];

export default function AuthorStatistics() {
    return (
        <>
     {/* Divider */}
     <Divider sx={{ my: 2 }} />

{/* Book Statistics Section */}
<Typography variant="h3" color="inherit">
    Book Statistics
</Typography>
<Grid container spacing={3} sx={{ mt: 2 }}>
    {books.map((book) => (
        <Grid item xs={12} sm={6} md={4} key={book.bookId}>
            <Box
                sx={{
                    p: 2,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 1,
                    "&:hover": {
                        transform: "scale(1.02)",
                        transition: "transform 0.3s ease",
                        boxShadow: 3,
                    },
                }}
            >
                <Typography variant="h6" color="inherit">
                    {book.nameofBook}
                </Typography>
                <Typography variant="body1" color="inherit">
                    <b>Views:</b> {book.noOfViews}
                </Typography>
                <Typography variant="body1" color="inherit">
                    <b>Likes:</b> {book.noOfLikes}
                </Typography>
                <Typography variant="body1" color="inherit">
                    <b>Downloads:</b> {book.noOfDownloads}
                </Typography>
                <Typography variant="body1" color="inherit">
                    <b>Avg. Reading Time:</b> {book.averageReadingTime}
                </Typography>
            </Box>
        </Grid>
    ))}
</Grid>
    </>
    )
}