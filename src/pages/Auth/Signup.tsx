import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Box,
  MenuItem,
} from "@mui/material";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  role: string;
}

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    role: "PUBLISHER", // Default role
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      dateOfBirth: formData.dateOfBirth,
      roles: [{ name: formData.role }],
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Signup successful!");
      console.log(response.data);
    } catch (error) {
      console.error("Signup failed", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={6} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Create a new account.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            margin="normal"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            margin="normal"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            InputProps={{ startAdornment: <Mail size={20} /> }}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            InputProps={{ startAdornment: <Lock size={20} /> }}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <TextField
            fullWidth
            label="Date of Birth"
            type="date"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={formData.dateOfBirth}
            onChange={(e) =>
              setFormData({ ...formData, dateOfBirth: e.target.value })
            }
            required
          />
          <TextField
            select
            fullWidth
            label="Role"
            margin="normal"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <MenuItem value="PUBLISHER">Publisher</MenuItem>
            <MenuItem value="READER">Reader</MenuItem>
          </TextField>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Sign Up
          </Button>
        </Box>

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Already have an account?{" "}
          <Link to="/" style={{ textDecoration: "none", color: "#1976d2" }}>
            Sign in
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default SignupPage;
