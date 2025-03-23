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
} from "@mui/material";
import { Edit } from "@mui/icons-material";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  dateOfBirth: string;
}

const PersonCard: React.FC = () => {
  const [user, setUser] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    dateOfBirth: "",
  });

  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState(user);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const role = parsedUser?.roles?.[0]?.name || "READER";
      setUser({
        firstName: parsedUser.firstName,
        lastName: parsedUser.lastName,
        email: parsedUser.email,
        role: role,
        dateOfBirth: parsedUser.dateOfBirth,
      });
      setEditData({
        firstName: parsedUser.firstName,
        lastName: parsedUser.lastName,
        email: parsedUser.email,
        role: role,
        dateOfBirth: parsedUser.dateOfBirth,
      });
    }
  }, []);

  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = () => {
    setUser(editData);
    localStorage.setItem(
      "user",
      JSON.stringify({ ...editData, roles: [{ name: editData.role }] })
    );
    handleEditClose();
  };

  return (
    <Box sx={{ py: 8, px: 2 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Card elevation={4} sx={{ borderRadius: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 4,
              }}
            >
              <Avatar
                sx={{ width: 80, height: 80, bgcolor: "primary.main", mb: 2 }}
              >
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </Avatar>
              <Typography variant="h5" fontWeight={600}>
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user.role}
              </Typography>
            </Box>
            <Divider />
            <CardContent sx={{ px: 4, py: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Email:
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {user.email}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Date of Birth:
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {user.dateOfBirth}
              </Typography>
            </CardContent>
            <Box sx={{ textAlign: "center", pb: 3 }}>
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={handleEditOpen}
                sx={{ borderRadius: 3, textTransform: "none" }}
              >
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
          <Button onClick={handleEditSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PersonCard;
