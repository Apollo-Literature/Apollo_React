"use client"

import { Box, Typography, Button, Grid, Container } from "@mui/material"
import { motion } from "framer-motion"

const MotionBox = motion(Box)
const MotionTypography = motion(Typography)
const MotionButton = motion(Button)

export default function HeroSection() {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: "background.default",
        color: "text.primary",
        padding: "100px 0",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(45deg, #0066ff, #00cc99, #ff6600, #ffcc00)",
          backgroundSize: "400% 400%",
          animation: "gradientBackground 15s ease infinite",
          zIndex: -1,
        }}
      />
      <Container maxWidth="lg">
        <Grid container spacing={2} sx={{ minHeight: "80vh", alignItems: "center" }}>
          <Grid item xs={12} md={6}>
            <MotionBox
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <MotionTypography
                variant="overline"
                sx={{
                  mb: 2,
                  color: "primary.main",
                  fontWeight: "bold",
                  letterSpacing: 2,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Welcome to Apollo
              </MotionTypography>

              <MotionTypography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  background: "linear-gradient(135deg, #0066ff, #00cc99)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Discover a World of Knowledge with Apollo
              </MotionTypography>

              <MotionTypography
                variant="body1"
                sx={{
                  mb: 4,
                  maxWidth: "80%",
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  lineHeight: 1.6,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Explore a vast collection of books and resources. Whether you are an avid reader or just getting started, Apollo has something for everyone. Dive into a journey of knowledge and learning today!
              </MotionTypography>

              <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                <MotionButton
                  variant="contained"
                  size="large"
                  sx={{
                    mr: 2,
                    px: 4,
                    py: 1.5,
                    borderRadius: 4,
                    boxShadow: "0 6px 20px rgba(0, 102, 255, 0.3)",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Apollo
                </MotionButton>
                <MotionButton
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 4,
                    borderColor: "primary.main",
                    color: "primary.main",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </MotionButton>
              </MotionBox>
            </MotionBox>
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <MotionBox
              sx={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: 4,
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Optional Image or Placeholder */}
              <img src="https://i.postimg.cc/yNGQfztk/f-the-Best-Selling-Books-That-Might-Make-A-Great-Addition-To-Your-Library.jpg" alt="Apollo Library" style={{ width: "100%", borderRadius: "8px" }} />
            </MotionBox>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
