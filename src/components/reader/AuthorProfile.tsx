"use client";

import { Box, Typography, Avatar, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, useTheme } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import StatCard from "./StatCard"; // Importing the separated component

interface Author {
    id: number;
    name: string;
    bio: string;
    likesReceived: number;
    commentsReceived: number;
    viewsReached: number;
}

const initialAuthor: Author = {
    id: 1,
    name: "Ahmed Meekail Ibrahim",
    bio: "This is the author's description. You can add more details here about their background, books, or achievements.",
    likesReceived: 100000,
    commentsReceived: 1000,
    viewsReached: 100000,
};

export default function AuthorProfile() {
    const [author, setAuthor] = useState<Author>(initialAuthor);
    const [open, setOpen] = useState(false);
    const [editedData, setEditedData] = useState({ name: author.name, bio: author.bio });
    const theme = useTheme();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedData({ ...editedData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setAuthor({ ...author, ...editedData });
        handleClose();
    };

    return (
        <Box display="flex" flexDirection="column" gap={2} sx={{ p: 3 }}>
            {/* Avatar, Name, and Edit Button */}
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" gap={3}>
                    <Avatar alt={author.name} src="/images/avatar01.jpg" sx={{ width: 200, height: 200 }} />
                    <Typography variant="h3">{author.name}</Typography>
                </Box>
                <Button variant="contained" onClick={handleOpen}>Edit Profile</Button>
            </Box>

            {/* Description */}
            <Typography variant="body1">{author.bio}</Typography>

            {/* Stats Section */}
            <Box display="flex" gap={4} sx={{ mt: 3 }}>
                <StatCard icon={<FavoriteIcon sx={{ fontSize: 40, color: theme.palette.error.main }} />} label="Likes Received" value={author.likesReceived} />
                <StatCard icon={<CommentIcon sx={{ fontSize: 40, color: theme.palette.info.main }} />} label="Comments Received" value={author.commentsReceived} />
                <StatCard icon={<VisibilityIcon sx={{ fontSize: 40, color: theme.palette.success.main }} />} label="Views Reached" value={author.viewsReached} />
            </Box>

            {/* Edit Profile Modal */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, width: 400 }}>
                    <TextField label="Name" name="name" value={editedData.name} onChange={handleChange} fullWidth />
                    <TextField label="Bio" name="bio" value={editedData.bio} onChange={handleChange} fullWidth multiline rows={3} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">Cancel</Button>
                    <Button onClick={handleSave} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
