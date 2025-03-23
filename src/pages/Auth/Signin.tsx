import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Checkbox,
  Button,
  Typography,
  Container,
  Paper,
  Box,
  InputAdornment,
  Alert,
} from "@mui/material";
import { Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const SigninPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      // Store token and user info
      const userData = response.data;
      if (formData.rememberMe) {
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        sessionStorage.setItem("user", JSON.stringify(userData));
      }

      // Navigate to dashboard (you can customize this based on role)
      navigate("/reader/dashboard");
    } catch (err) {
      const axiosError = err as AxiosError<unknown>;
      if (axiosError.response && axiosError.response.data) {
        setError(axiosError.response.data.message || "Invalid credentials");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={6} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Use your account details below.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail size={20} />
                </InputAdornment>
              ),
            }}
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock size={20} />
                </InputAdornment>
              ),
            }}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <Checkbox
                checked={formData.rememberMe}
                onChange={(e) =>
                  setFormData({ ...formData, rememberMe: e.target.checked })
                }
              />
              <Typography variant="body2">Remember me</Typography>
            </Box>
            <Link
              to="/forgot-password"
              style={{ textDecoration: "none", color: "#1976d2" }}
            >
              Forgot password?
            </Link>
          </Box>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Sign In
          </Button>
        </Box>

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{ textDecoration: "none", color: "#1976d2" }}
          >
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default SigninPage;
