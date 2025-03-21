import { Box, Container, Typography, Link, Grid, Divider, useTheme } from "@mui/material"
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material"

export default function Footer() {
  const theme = useTheme()

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
              Your gateway to endless stories and knowledge. Discover books that inspire, educate, and entertain.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Link href="https://www.facebook.com/profile.php?id=61573996170407" color="inherit" sx={{ mr: 2 }}>
                <Facebook />
              </Link>
              <Link href="https://x.com/Apollo1568264" color="inherit" sx={{ mr: 2 }}>
                <Twitter />
              </Link>
              <Link href="https://www.instagram.com/apolloonlinelibrary/" color="inherit" sx={{ mr: 2 }}>
                <Instagram />
              </Link>
              <Link href="https://www.linkedin.com/in/apollo-lib-305946354/" color="inherit">
                <LinkedIn />
              </Link>
            </Box>
          </Grid>

          <Grid item xs={6} sm={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Explore
            </Typography>
            <Link href="#" color="inherit" display="block">
              Home
            </Link>
            <Link href="#" color="inherit" display="block">
              E-books
            </Link>
            <Link href="#" color="inherit" display="block">
              Audiobooks
            </Link>
            <Link href="#" color="inherit" display="block">
              Authors
            </Link>
          </Grid>

          <Grid item xs={6} sm={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Company
            </Typography>
            <Link href="#" color="inherit" display="block">
              About Us
            </Link>
            <Link href="#" color="inherit" display="block">
              Contact
            </Link>
            <Link href="#" color="inherit" display="block">
              Careers
            </Link>
            <Link href="#" color="inherit" display="block">
              Blog
            </Link>
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

        <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} Apollo Books. All rights reserved.
          </Typography>
          <Box>
            <Link href="#" color="inherit" sx={{ pl: 1 }}>
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" sx={{ pl: 2 }}>
              Terms of Use
            </Link>
            <Link href="#" color="inherit" sx={{ pl: 2 }}>
              Cookie Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

