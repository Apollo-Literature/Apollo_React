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
      }
    >
      <Container maxWidth="xl">
        <Grid container spacing={2} sx={{ minHeight: "100vh", alignItems: "center" }}>
          <Grid item xs={12} md={6}>
            <MotionBox initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <MotionTypography
                variant="overline"
                sx={{ mb: 2, color: "primary.main" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Exclusive Content
              </MotionTypography>

              <MotionTypography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  background: "linear-gradient(45deg, #6247aa, #a06cd5)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
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
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Not all stories are what they seem. Not all letters are ink on paper. And not all pages are just pages.
                Some are marks of destiny...
              </MotionTypography>

              <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                <MotionButton
                  variant="contained"
                  size="large"
                  sx={{
                    mr: 2,
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    boxShadow: "0 4px 14px 0 rgba(98, 71, 170, 0.39)",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Buy now
                </MotionButton>
                <MotionButton
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn more
                </MotionButton>
              </MotionBox>
            </MotionBox>
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <MotionBox
                // component="img"
            //   src="/placeholder.svg?height=500&width=500"
            //   alt="Harry Potter"
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

