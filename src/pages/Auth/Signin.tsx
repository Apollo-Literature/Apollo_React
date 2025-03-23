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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
  role: "READER" | "PUBLISHER";
}

const SigninPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
    role: "READER",
  });

  interface LoginResponse {
    token: string;
    refreshToken: string;
    user: {
      roles: { name: string }[];
    };
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post<LoginResponse>("http://localhost:8080/api/v1/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token, refreshToken, user } = response.data;

      // Store tokens in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      // Navigate based on user role
      const role = user?.roles?.[0]?.name;
      if (role === "PUBLISHER") {
        navigate("/publisher/dashboard");
      } else {
        navigate("/reader/dashboard");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
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
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          {/* Role selection */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Select Role</InputLabel>
            <Select
              labelId="role-label"
              value={formData.role}
              label="Select Role"
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value as "READER" | "PUBLISHER" })
              }
            >
              <MenuItem value="READER">Reader</MenuItem>
              <MenuItem value="PUBLISHER">Publisher</MenuItem>
            </Select>
          </FormControl>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center">
              <Checkbox
                checked={formData.rememberMe}
                onChange={(e) =>
                  setFormData({ ...formData, rememberMe: e.target.checked })
                }
              />
              <Typography variant="body2">Remember me</Typography>
            </Box>
            <Link to="/forgot-password" style={{ textDecoration: "none", color: "#1976d2" }}>
              Forgot password?
            </Link>
          </Box>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Sign In
          </Button>
        </Box>

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ textDecoration: "none", color: "#1976d2" }}>
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default SigninPage;
