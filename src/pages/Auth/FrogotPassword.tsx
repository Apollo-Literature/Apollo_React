import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Box,
  Fade,
  GlobalStyles,
} from "@mui/material";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(
      "If an account exists with this email, you will receive password reset instructions."
    );
  };

  return (
    <>
      <GlobalStyles
        styles={{
          body: { margin: 0, padding: 0, width: "100%", height: "100%" },
          html: { margin: 0, padding: 0, width: "100%", height: "100%" },
        }}
      />
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
            <Paper
              elevation={6}
              sx={{
                p: 4,
                borderRadius: 3,
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                align="center"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                Apollo
              </Typography>
              <Typography variant="h5" gutterBottom align="center">
                Forgot Password
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                gutterBottom
                align="center"
              >
                Enter your email to receive password reset instructions.
              </Typography>

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  type="email"
                  margin="normal"
                  InputProps={{ startAdornment: <Mail size={20} /> }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

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
                  Reset Password
                </Button>
              </Box>

              {message && (
                <Typography
                  variant="body2"
                  color="success.main"
                  align="center"
                  sx={{ mt: 2 }}
                >
                  {message}
                </Typography>
              )}

              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Remember your password?{" "}
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "#1976d2" }}
                >
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{ "&:hover": { color: "#115293" } }}
                  >
                    Sign in
                  </Typography>
                </Link>
              </Typography>
            </Paper>
          </Fade>
        </Container>
      </Box>
    </>
  );
};

export default ForgotPassword;
