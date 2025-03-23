import { Box } from "@mui/material";
import { motion } from "framer-motion";
import React from "react"; // Import React

// Define the interface for the props
interface ProfileImageProps {
  src: string;
  alt: string;
}

const ProfileImage = ({ src, alt }: ProfileImageProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        style={{
          background: "linear-gradient(45deg, #FF0099, #493240)",
          padding: "6px",
          borderRadius: "50%",
          boxShadow: "0 4px 15px rgba(255, 255, 255, 0.3)",
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            maxWidth: "200px",
            borderRadius: "50%",
            border: "4px solid transparent",
          }}
        />
      </motion.div>
    </Box>
  );
};

export default ProfileImage;
