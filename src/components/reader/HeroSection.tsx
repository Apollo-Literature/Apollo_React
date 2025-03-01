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
        bgcolor: "background.paper",
        color: "text.primary",
        overflow: "hidden",
        position: "relative",
        py: 10, // Adds vertical padding for a cleaner look
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} sx={{ minHeight: "100vh", alignItems: "center" }}>
          {/* Left Section */}
          <Grid item xs={12} md={6}>
            <MotionBox
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              sx={{ px: 3 }}
            >
              <MotionTypography
                variant="overline"
                sx={{ mb: 2, color: "primary.main", fontWeight: "bold" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Exclusive Content
              </MotionTypography>

              <MotionTypography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  background: "linear-gradient(45deg, #6247aa, #a06cd5)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "2.5rem", // Adjusted font size for better readability
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Uncover the truth of the Chosen One
              </MotionTypography>

              <MotionTypography
                variant="body1"
                sx={{
                  mb: 4,
                  maxWidth: "90%",
                  lineHeight: 1.6,
                  fontSize: "1.125rem", // Slightly larger font size
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Not all stories are what they seem. Not all letters are ink on paper. And not all pages are just pages. Some are marks of destiny...
              </MotionTypography>

              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <MotionButton
                  variant="contained"
                  size="large"
                  sx={{
                    mr: 2,
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    boxShadow: "0 4px 14px rgba(98, 71, 170, 0.39)",
                    textTransform: "none", // Prevents text from being capitalized
                    fontWeight: "bold", // Adds a bolder font weight to the button text
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Buy Now
                </MotionButton>
                <MotionButton
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: "bold",
                    borderColor: "primary.main", // Border color for better contrast
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </MotionButton>
              </MotionBox>
            </MotionBox>
          </Grid>

          {/* Right Section */}
          <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <MotionBox
            //   component="img"
            //   src="/placeholder.svg" // Add a real image URL here
            //   alt="Hero Image"
              sx={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: 4,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
