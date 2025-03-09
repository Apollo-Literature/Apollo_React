import React, { useCallback } from 'react';
import { TextField, Button, Typography, Container, Paper, Box } from '@mui/material';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('If an account exists with this email, you will receive password reset instructions.');
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={6} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom>
          Forgot Password
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Enter your email to receive password reset instructions.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            autoFocus
            type="email"
            margin="normal"
            InputProps={{ startAdornment: <Mail size={20} /> }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Reset Password
          </Button>
        </Box>

        {message && (
          <Typography variant="body2" color="success.main" align="center" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Remember your password?{' '}
          <Link to="/" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Sign in
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;