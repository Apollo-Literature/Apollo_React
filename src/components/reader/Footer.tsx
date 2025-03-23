import {
  Box,
  Container,
  Typography,
  Grid,
  Divider,
  useTheme,
  Link as MuiLink, // MUI Link
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom"; // React Router Link

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.mode === "light" ? "grey.100" : "grey.900",
        py: 6,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-evenly">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              APOLLO
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your gateway to endless stories and knowledge. Discover books that
              inspire, educate, and entertain.
            </Typography>
            <Box sx={{ mt: 2 }}>
              {/* MUI Link for external social media links */}
              <MuiLink
                href="https://www.facebook.com/profile.php?id=61573996170407"
                color="inherit"
                sx={{ mr: 2 }}
              >
                <Facebook />
              </MuiLink>
              <MuiLink
                href="https://x.com/Apollo1568264"
                color="inherit"
                sx={{ mr: 2 }}
              >
                <Twitter />
              </MuiLink>
              <MuiLink
                href="https://www.instagram.com/apolloonlinelibrary/"
                color="inherit"
                sx={{ mr: 2 }}
              >
                <Instagram />
              </MuiLink>
              <MuiLink
                href="https://www.linkedin.com/in/apollo-lib-305946354/"
                color="inherit"
              >
                <LinkedIn />
              </MuiLink>
            </Box>
          </Grid>

          <Grid item xs={6} sm={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Explore
            </Typography>
            {/* Combine MUI Link with React Router Link */}
            <MuiLink
              component={RouterLink}
              to="/"
              color="inherit"
              display="block"
            >
              Home
            </MuiLink>
            <MuiLink
              component={RouterLink}
              to="/explore/dashboard"
              color="inherit"
              display="block"
            >
              E-books
            </MuiLink>
            <MuiLink
              component={RouterLink}
              to="/library/dashboard"
              color="inherit"
              display="block"
            >
              Audiobooks
            </MuiLink>
            <MuiLink
              component={RouterLink}
              to="/authors"
              color="inherit"
              display="block"
            >
              Authors
            </MuiLink>
          </Grid>

          <Grid item xs={6} sm={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Company
            </Typography>
            {/* Combine MUI Link with React Router Link */}
            <MuiLink
              component={RouterLink}
              to="/aboutus"
              color="inherit"
              display="block"
            >
              About Us
            </MuiLink>
            <MuiLink
              component={RouterLink}
              to="/contact"
              color="inherit"
              display="block"
            >
              Contact
            </MuiLink>
            <MuiLink
              component={RouterLink}
              to="/careers"
              color="inherit"
              display="block"
            >
              Careers
            </MuiLink>
            <MuiLink
              component={RouterLink}
              to="/blog"
              color="inherit"
              display="block"
            >
              Blog
            </MuiLink>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Subscribe to Our Newsletter
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Stay updated with our latest releases and author events.
            </Typography>
            <Box component="form" noValidate sx={{ display: "flex" }}>
              <input
                type="email"
                placeholder="Your email"
                style={{
                  padding: "10px 12px",
                  borderRadius: "4px 0 0 4px",
                  border: `1px solid ${theme.palette.divider}`,
                  borderRight: "none",
                  flexGrow: 1,
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "10px 16px",
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  border: "none",
                  borderRadius: "0 4px 4px 0",
                  cursor: "pointer",
                }}
              >
                Subscribe
              </button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} Apollo Books. All rights reserved.
          </Typography>
          <Box>
            {/* Combine MUI Link with React Router Link */}
            <MuiLink
              component={RouterLink}
              to="/privacy-policy"
              color="inherit"
              sx={{ pl: 1 }}
            >
              Privacy Policy
            </MuiLink>
            <MuiLink
              component={RouterLink}
              to="/terms-of-use"
              color="inherit"
              sx={{ pl: 2 }}
            >
              Terms of Use
            </MuiLink>
            <MuiLink
              component={RouterLink}
              to="/cookie-policy"
              color="inherit"
              sx={{ pl: 2 }}
            >
              Cookie Policy
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
