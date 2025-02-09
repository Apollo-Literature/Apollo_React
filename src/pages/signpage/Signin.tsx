import React, { useState } from 'react';
import { TextField, Checkbox, Button, Typography, Container, Paper, Box } from '@mui/material';
import { Lock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const SigninPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add authentication logic here
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={6} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Use your account details below.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            margin="normal"
            InputProps={{ startAdornment: <Mail size={20} /> }}
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
            InputProps={{ startAdornment: <Lock size={20} /> }}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center">
              <Checkbox
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              />
              <Typography variant="body2">Remember me</Typography>
            </Box>
            <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Forgot password?
            </Link>
          </Box>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Sign In
          </Button>
        </Box>

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default SigninPage;