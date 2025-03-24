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
    role: "Software Engineer /Co-Founder / Lead Developer",
    description:
      "Hi, I'm Ahmed Meekail Ibrahim, the cofounder of Apollo. As a software engineer and a literature enthusiast, I built this platform to create a space where readers and writers can connect and publish. I've always been passionate about technology and storytelling. However, due to recent events such as COVID, literacy rates are declining. My goal is to increase these numbers by creating a gamified literacy platform where users can read and receive achievements. With Apollo, I believe we can make reading and writing more engaging.",
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
  {
    name: "Supun Devendra",
    role: "Software Engineer /Co-Founder / Lead Developer Frontend",
    description:
      "A passionate and detail-oriented Software Engineer with a strong focus on frontend development. Co-Founder and Lead Developer of Apollo, dedicated to building intuitive and user-centric web applications using React, Vite, and MUI. I believe in clean code, seamless user experiences, and the power of collaboration to bring meaningful products to life.",
    imageSrc: "/",
    socialMediaLinks: [
      {
        icon: <InstagramIcon />,
        label: "Instagram",
        href: "https://www.instagram.com/supundevendra12/",
        color: "#E1306C",
        hoverColor: "#C13584",
      },
      {
        icon: <EmailIcon />,
        label: "Email",
        href: "mailto:supundevendra1207@gmail.com",
        color: "#D44638",
        hoverColor: "#B33A2E",
      },
      {
        icon: <LinkedInIcon />,
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/supun-devendra/",
        color: "#0077B5",
        hoverColor: "#005582",
      },
    ],
  },
  {
    name: "Ashrishtika Elanghovan",
    role: "documentation , presentation and pitch description",
    description:
      "I am Shrishtika, the founder of Apollo and a software engineering student with a passion for creativity and technology. I pride myself on my strong communication skills and my enthusiasm for exploring new tech frontiers. With a problem-solving mindset, I am always eager to innovate and contribute to the ever-evolving world of software development.",
    imageSrc: "/",
    socialMediaLinks: [
      {
        icon: <InstagramIcon />,
        label: "Instagram",
        href: "https://instagram.com/Shrish_nila",
        color: "#E1306C",
        hoverColor: "#C13584",
      },
      {
        icon: <EmailIcon />,
        label: "Email",
        href: "mailto:shrishtika.20230907@iit.ac.lk ",
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
  {
    name: "Subeethar Mahalingam",
    role: "Developer | AI Specialist | Landing Page Designer | Marketing Strategist",
    description:
      "I am a passionate developer with expertise in AI, landing page design, and marketing strategies. With a strong background in software development and a keen interest in artificial intelligence, I specialize in integrating AI-driven solutions into digital platforms.My work involves crafting seamless user experiences, optimizing landing pages for maximum engagement, and leveraging AI to enhance efficiency and innovation. Additionally, I apply strategic marketing techniques to build brand presence and connect with target audiences effectively.Whether it’s developing intelligent systems, designing high-converting landing pages, or executing impactful marketing campaigns, I am dedicated to delivering cutting-edge solutions that drive success.",
    imageSrc: "/",
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
        href: "https://www.linkedin.com/in/subeethar-mahalingam ",
        color: "#0077B5",
        hoverColor: "#005582",
      },
    ],
  },
  {
    name: "Shan Fernando",
    role: "Software Engineer / Co-Founder / Lead Developer Backend",
    description:
      "I am Shan, a backend developer passionate about building scalable and efficient systems. As a software engineering student, I thrive on solving complex problems and optimizing performance. With expertise in Spring Boot and PostgreSQL, I focus on creating robust architectures that drive seamless digital experiences. Always eager to learn and innovate, I embrace new technologies to enhance backend development.",
    imageSrc: "/",
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
        href: "mailto:Shanemalka9@gmail.com",
        color: "#D44638",
        hoverColor: "#B33A2E",
      },
      {
        icon: <LinkedInIcon />,
        label: "LinkedIn",
        href: "https://linkedin.com/in/ambagahage-fernando-ba7b682a7",
        color: "#0077B5",
        hoverColor: "#005582",
      },
    ],
  },
  {
    name: "Wisam Ahammed",
    role: "Software Engineer / Co-Founder / Fullstack Developer",
    description:
      "Hi, I'm Wisam, the co-founder of Apollo. As a software engineer and a literature enthusiast, We built this platform to create a space where readers and writers can connect and publish. I've always been passionate about technology and storytelling. However, due to recent events such as COVID, literacy rates are declining. My goal is to increase these numbers by creating a gamified literacy platform where users can read and receive achievements. With Apollo, I believe we can make reading and writing more engaging.",
    imageSrc: "/",
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
