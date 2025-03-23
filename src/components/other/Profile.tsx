import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  IconButton,
  Chip,
} from "@mui/material";
import { Edit, PhotoCamera, Close } from "@mui/icons-material";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  dateOfBirth: string;
  phone?: string;
  avatar?: string; // Base64 or URL
}

const getRoleColor = (role: string) => {
  switch (role.toUpperCase()) {
    case "PUBLISHER":
      return "primary";
    case "READER":
      return "secondary";
    default:
      return "default";
  }
};

const PersonCard: React.FC = () => {
  const [user, setUser] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    dateOfBirth: "",
    phone: "",
    avatar: "",
  });

  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState(user);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const role = parsedUser?.roles?.[0]?.name || "READER";
      const fullUser: UserData = {
        firstName: parsedUser.firstName,
        lastName: parsedUser.lastName,
        email: parsedUser.email,
        role,
        dateOfBirth: parsedUser.dateOfBirth,
        phone: parsedUser.phone || "",
        avatar: parsedUser.avatar || "",
      };
      setUser(fullUser);
      setEditData(fullUser);
    }
  }, []);

  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({ ...editData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSave = () => {
    setUser(editData);
    localStorage.setItem("user", JSON.stringify({ ...editData, roles: [{ name: editData.role }] }));
    setSnackbarOpen(true);
    handleEditClose();
  };

  return (
    <Box sx={{ py: 8, px: 2 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Card elevation={4} sx={{ borderRadius: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 4 }}>
              <Avatar
                src={user.avatar}
                sx={{ width: 80, height: 80, bgcolor: "primary.main", mb: 2 }}
              >
                {!user.avatar && (
                  <>
                    {user.firstName.charAt(0)}
                    {user.lastName.charAt(0)}
                  </>
                )}
              </Avatar>
              <Typography variant="h5" fontWeight={600}>
                {user.firstName} {user.lastName}
              </Typography>
              <Chip label={user.role} color={getRoleColor(user.role)} sx={{ mt: 1 }} />
            </Box>
            <Divider />
            <CardContent sx={{ px: 4, py: 3 }}>
              <Typography variant="body2" color="text.secondary">Email:</Typography>
              <Typography variant="subtitle1" gutterBottom>{user.email}</Typography>

              <Typography variant="body2" color="text.secondary">Date of Birth:</Typography>
              <Typography variant="subtitle1" gutterBottom>{user.dateOfBirth}</Typography>

              {user.phone && (
                <>
                  <Typography variant="body2" color="text.secondary">Phone:</Typography>
                  <Typography variant="subtitle1" gutterBottom>{user.phone}</Typography>
                </>
              )}
            </CardContent>
            <Box sx={{ textAlign: "center", pb: 3 }}>
              <Button variant="outlined" startIcon={<Edit />} onClick={handleEditOpen} sx={{ borderRadius: 3, textTransform: "none" }}>
                Edit Profile
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center" mt={1}>
            <Avatar src={editData.avatar} sx={{ width: 80, height: 80, mb: 1 }} />
            <Button variant="outlined" component="label" startIcon={<PhotoCamera />}>
              Upload Photo
              <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
            </Button>
          </Box>
          <TextField
            margin="normal"
            label="First Name"
            name="firstName"
            fullWidth
            value={editData.firstName}
            onChange={handleEditChange}
          />
          <TextField
            margin="normal"
            label="Last Name"
            name="lastName"
            fullWidth
            value={editData.lastName}
            onChange={handleEditChange}
          />
          <TextField
            margin="normal"
            label="Email"
            name="email"
            fullWidth
            value={editData.email}
            onChange={handleEditChange}
          />
          <TextField
            margin="normal"
            label="Phone"
            name="phone"
            fullWidth
            value={editData.phone || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="normal"
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={editData.dateOfBirth}
            onChange={handleEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message="Profile updated successfully"
        action={
          <IconButton size="small" color="inherit" onClick={() => setSnackbarOpen(false)}>
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
};

export default PersonCard;
