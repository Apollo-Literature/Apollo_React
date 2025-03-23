import { Box, Grid } from "@mui/material";
import { motion } from "framer-motion";
import ProfileImage from "./ProfileImage";
import ProfileInfo from "./ProfileInfo";
import React from "react"; // Import React

// Define the interface for a single social media link
interface SocialMediaLink {
  icon: React.ReactNode; // Use React.ReactNode
  label: string;
  href: string;
  color: string;
  hoverColor: string;
}

// Define the interface for the props
interface PersonCardProps {
  name: string;
  role: string;
  description: string;
  imageSrc: string;
  socialMediaLinks: SocialMediaLink[];
}

const PersonCard = ({
  name,
  role,
  description,
  imageSrc,
  socialMediaLinks,
}: PersonCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box
        sx={{
          border: 1,
          padding: 2,
          borderColor: "white",
          borderRadius: 2,
          marginX: { xs: 2, sm: 5, md: 10, lg: 20 },
          marginY: 5,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <Grid container spacing={4} alignItems="center">
          {/* Image Column */}
          <Grid item xs={12} sm={4}>
            <ProfileImage src={imageSrc} alt={name} />
          </Grid>

          {/* Text Column */}
          <Grid item xs={12} sm={8}>
            <ProfileInfo
              name={name}
              role={role}
              description={description}
              socialMediaLinks={socialMediaLinks}
            />
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
};

export default PersonCard;
