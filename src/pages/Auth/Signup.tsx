import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Box,
} from "@mui/material";
import { Mail, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const [firstName, lastName] = formData.name.split(" ");

    const data = JSON.stringify({
      firstName: firstName || "",
      lastName: lastName || "",
      email: formData.email,
      password: formData.password,
      dateOfBirth: "2003-04-19",
      roles: [
        {
          name: "READER",
        },
      ],
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/api/v1/auth/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
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
            label="Full Name"
            variant="outlined"
            type="text"
            margin="normal"
            InputProps={{ startAdornment: <User size={20} /> }}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
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
            variant="outlined"
            type="password"
            margin="normal"
            InputProps={{ startAdornment: <Lock size={20} /> }}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />

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
