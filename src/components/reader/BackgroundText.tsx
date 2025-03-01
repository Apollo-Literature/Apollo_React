"use client"

import { Box, useTheme } from "@mui/material"
import { motion } from "framer-motion"

const MotionBox = motion(Box)

export default function BackgroundText() {
  const theme = useTheme()
  const words: string[] = [
    "EXPRESSION",
    "IMAGINATION",
    "PAGES",
    "STORYTELLING",
    "CREATIVITY",
    "WORDS",
    "APOLLO",
    "BOOKS",
    "READING",
  ]

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      {words.map((word, index) => (
        <MotionBox
          key={index}
          sx={{
            position: "absolute",
            color: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.03)" : "rgba(255, 255, 255, 0.03)",
            fontSize: { xs: "3rem", md: "5rem", lg: "7rem" },
            fontWeight: "bold",
            whiteSpace: "nowrap",
          }}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: Math.random() * 360,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: Math.random() * 100 + 50,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          {word}
        </MotionBox>
      ))}
    </Box>
  )
}

