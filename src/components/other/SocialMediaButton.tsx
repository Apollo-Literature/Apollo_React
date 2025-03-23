import { Button } from "@mui/material";
import { motion } from "framer-motion";
import React from "react"; // Import React

// Define the interface for the props
interface SocialMediaButtonProps {
  icon: React.ReactNode; // Use React.ReactNode
  label: string;
  href: string;
  color: string;
  hoverColor: string;
}

const SocialMediaButton = ({
  icon,
  label,
  href,
  color,
  hoverColor,
}: SocialMediaButtonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
    >
      <Button
        variant="contained"
        startIcon={icon}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          backgroundColor: color,
          "&:hover": { backgroundColor: hoverColor },
        }}
      >
        {label}
      </Button>
    </motion.div>
  );
};

export default SocialMediaButton;
