import { Typography, Box } from "@mui/material";
import SocialMediaButton from "./SocialMediaButton";
import React from "react";
// Define the interface for a single social media link
interface SocialMediaLink {
  icon: React.ReactNode; // The icon component (e.g., <InstagramIcon />)
  label: string; // The label for the button (e.g., "Instagram")
  href: string; // The URL to link to
  color: string; // The background color of the button
  hoverColor: string; // The background color on hover
}

// Define the interface for the props
interface ProfileInfoProps {
  name: string;
  role: string;
  description: string;
  socialMediaLinks: SocialMediaLink[]; // An array of social media links
}

const ProfileInfo = ({
  name,
  role,
  description,
  socialMediaLinks,
}: ProfileInfoProps) => {
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          fontSize: { xs: "1.5rem", sm: "1.8rem" },
          mb: 2,
        }}
      >
        {name}
      </Typography>
      <Typography variant="body1">{role}</Typography>
      <Typography
        variant="body1"
        sx={{
          py: 3,
          fontSize: { xs: "1rem", sm: "1.2rem" },
        }}
      >
        {description}
      </Typography>

      {/* Social Media Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {socialMediaLinks.map((link, index) => (
          <SocialMediaButton
            key={index}
            icon={link.icon}
            label={link.label}
            href={link.href}
            color={link.color}
            hoverColor={link.hoverColor}
          />
        ))}
      </Box>
    </>
  );
};

export default ProfileInfo;
