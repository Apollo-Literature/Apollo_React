import {
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import PersonCard from "../../components/other/PersonCard";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const theme = createTheme({
  palette: {
    background: {
      default: "linear-gradient(to right, #0F172A, #3B0764)",
    },
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    h1: {
      fontSize: "3rem",
      fontWeight: "bold",
      textAlign: "center",
    },
    h4: {
      fontSize: "1.8rem",
      fontWeight: "bold",
    },
    body1: {
      fontSize: "1.2rem",
    },
  },
});

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Data for each person
const people = [
  {
    name: "Ahmed Meekail Ibrahim",
    role: "Software Engineer / Founder / Lead Developer",
    description:
      "Hi, I'm Ahmed Meekail Ibrahim, the founder of Apollo. As a software engineer and a literature enthusiast, I built this platform to create a space where readers and writers can connect and publish. I've always been passionate about technology and storytelling. However, due to recent events such as COVID, literacy rates are declining. My goal is to increase these numbers by creating a gamified literacy platform where users can read and receive achievements. With Apollo, I believe we can make reading and writing more engaging.",
    imageSrc: "/ahmed.png",
    socialMediaLinks: [
      {
        icon: <InstagramIcon />,
        label: "Instagram",
        href: "https://instagram.com/yourprofile",
        color: "#E1306C",
        hoverColor: "#C13584",
      },
      {
        icon: <EmailIcon />,
        label: "Email",
        href: "mailto:youremail@example.com",
        color: "#D44638",
        hoverColor: "#B33A2E",
      },
      {
        icon: <LinkedInIcon />,
        label: "LinkedIn",
        href: "https://linkedin.com/in/yourprofile",
        color: "#0077B5",
        hoverColor: "#005582",
      },
    ],
  },
  // Add more people here
];

const AboutUs = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGoHome = () => {
    navigate("/reader/dashboard"); // Navigate to the home page
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          background: theme.palette.background.default,
          color: theme.palette.text.primary,
          minHeight: "100vh",
          paddingY: 4,
        }}
      >
        <Container maxWidth="lg">
          {/* Animated Title */}
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2rem", sm: "3rem" },
                mb: 4,
              }}
            >
              About Us
            </Typography>
          </motion.div>

          {/* Go Home Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <Button
              variant="contained"
              onClick={handleGoHome}
              sx={{
                backgroundColor: "#3B0764",
                "&:hover": { backgroundColor: "#4C1D95" },
              }}
            >
              Go Back to Home
            </Button>
          </Box>

          {/* Animated Profile Cards */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {people.map((person, index) => (
              <PersonCard key={index} {...person} />
            ))}
          </motion.div>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AboutUs;
