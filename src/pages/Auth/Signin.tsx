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
  Fade,
} from "@mui/material";
import { Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

// Global CSS reset to remove default margins and padding
const globalStyles = `
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
`;

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
  role: "READER" | "PUBLISHER";
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3),
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const SigninPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
    role: "READER",
  });
  const [error, setError] = useState<string>("");

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
    <>
      <style>{globalStyles}</style> {/* Inject global styles */}
      <Box
        sx={{
          minHeight: "100vh", // Full viewport height
          width: "100%", // Full viewport width
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Gradient background
        }}
      >
        <Container component="main" maxWidth="sm">
          <Fade in={true} timeout={1000}>
            <StyledPaper elevation={6}>
              <Typography
                variant="h4"
                gutterBottom
                align="center"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                Apollo
              </Typography>
              <Typography variant="h5" gutterBottom align="center">
                Sign In
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                gutterBottom
                align="center"
              >
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

                {/* Role selection */}
                <FormControl fullWidth margin="normal">
                  <InputLabel id="role-label">Select Role</InputLabel>
                  <Select
                    labelId="role-label"
                    value={formData.role}
                    label="Select Role"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        role: e.target.value as "READER" | "PUBLISHER",
                      })
                    }
                  >
                    <MenuItem value="READER">Reader</MenuItem>
                    <MenuItem value="PUBLISHER">Publisher</MenuItem>
                  </Select>
                </FormControl>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mt: 2 }}
                >
                  <Box display="flex" alignItems="center">
                    <Checkbox
                      checked={formData.rememberMe}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          rememberMe: e.target.checked,
                        })
                      }
                    />
                    <Typography variant="body2">Remember me</Typography>
                  </Box>
                  <Link
                    to="/forgot-password"
                    style={{ textDecoration: "none", color: "#1976d2" }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ "&:hover": { color: "#115293" } }}
                    >
                      Forgot password?
                    </Typography>
                  </Link>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    transition: "background-color 0.3s ease",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                  }}
                >
                  Sign In
                </Button>
              </Box>

              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "#1976d2" }}
                >
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{ "&:hover": { color: "#115293" } }}
                  >
                    Sign up
                  </Typography>
                </Link>
              </Typography>
            </StyledPaper>
          </Fade>
        </Container>
      </Box>
    </>
  );
};

export default SigninPage;
