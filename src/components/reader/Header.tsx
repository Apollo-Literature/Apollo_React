<<<<<<< HEAD
"use client"

import { useState, useEffect } from "react"
=======
"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
>>>>>>> 6c975db697c71bd724e2e7c1f02bab8cd6958bd1
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  InputBase,
  Badge,
  IconButton,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Slide,
  useScrollTrigger,
<<<<<<< HEAD
} from "@mui/material"
=======
} from "@mui/material";
>>>>>>> 6c975db697c71bd724e2e7c1f02bab8cd6958bd1
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Menu as MenuIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
<<<<<<< HEAD
} from "@mui/icons-material"
import { styled, alpha } from "@mui/material/styles"
import apolloLogo from "../../assets/apollo-logo.png"

=======
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import apolloLogo from "../../assets/apollo-logo.png";

// Search Input Styling
>>>>>>> 6c975db697c71bd724e2e7c1f02bab8cd6958bd1
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  width: "100%",
  maxWidth: 300,
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
<<<<<<< HEAD
}))
=======
}));
>>>>>>> 6c975db697c71bd724e2e7c1f02bab8cd6958bd1

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: theme.spacing(2),
<<<<<<< HEAD
}))
=======
}));
>>>>>>> 6c975db697c71bd724e2e7c1f02bab8cd6958bd1

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  padding: theme.spacing(1, 1, 1, 4),
  transition: theme.transitions.create("width"),
  "& .MuiInputBase-input": {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
<<<<<<< HEAD
}))

const navItems: string[] = ["Home", "My library", "Explore"]

interface HeaderProps {
  toggleColorMode: () => void
}

export default function Header({ toggleColorMode }: HeaderProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 })

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
        <img src={apolloLogo || "/placeholder.svg"} alt="Apollo Logo" style={{ height: 40 }} />
        <Typography variant="h6" sx={{ ml: 1 }}>APOLLO</Typography>
=======
}));

// Navigation items with routes
const navItems = [
  { name: "Home", path: "/reader/dashboard" },
  { name: "My Library", path: "../Library/dashboard" },
  { name: "Explore", path: "/explore" },
];

interface HeaderProps {
  toggleColorMode: () => void;
}

export default function Header({ toggleColorMode }: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });

  // Mobile Drawer
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
        <img
          src={apolloLogo || "/placeholder.svg"}
          alt="Apollo Logo"
          style={{ height: 40 }}
        />
        <Typography variant="h6" sx={{ ml: 1 }}>
          APOLLO
        </Typography>
>>>>>>> 6c975db697c71bd724e2e7c1f02bab8cd6958bd1
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
<<<<<<< HEAD
          <ListItem key={item} disablePadding>
            <ListItemText primary={item} sx={{ textAlign: "center" }} />
=======
          <ListItem key={item.name} disablePadding>
            <ListItemText
              primary={
                <Link
                  to={item.path}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {item.name}
                </Link>
              }
              sx={{ textAlign: "center" }}
            />
>>>>>>> 6c975db697c71bd724e2e7c1f02bab8cd6958bd1
          </ListItem>
        ))}
      </List>
    </Box>
<<<<<<< HEAD
  )
=======
  );
>>>>>>> 6c975db697c71bd724e2e7c1f02bab8cd6958bd1

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={isScrolled ? 4 : 0}
        sx={{
          bgcolor: isScrolled ? "background.default" : "transparent",
<<<<<<< HEAD
          transition: theme.transitions.create(["background-color", "box-shadow"]),
=======
          transition: theme.transitions.create([
            "background-color",
            "box-shadow",
          ]),
>>>>>>> 6c975db697c71bd724e2e7c1f02bab8cd6958bd1
        }}
      >
        <Toolbar>
          {isMobile && (
<<<<<<< HEAD
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
=======
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
>>>>>>> 6c975db697c71bd724e2e7c1f02bab8cd6958bd1
              <MenuIcon />
            </IconButton>
          )}

<<<<<<< HEAD
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={apolloLogo || "/placeholder.svg"} alt="Apollo Logo" style={{ height: 40 }} />
            <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" }, ml: 1, fontWeight: "bold" }}>
=======
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={apolloLogo || "/placeholder.svg"}
              alt="Apollo Logo"
              style={{ height: 40 }}
            />
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
                ml: 1,
                fontWeight: "bold",
              }}
            >
>>>>>>> 6c975db697c71bd724e2e7c1f02bab8cd6958bd1
              APOLLO
            </Typography>
          </Box>

<<<<<<< HEAD
          {!isMobile && (
            <Box sx={{ display: "flex", ml: 4 }}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: "inherit", mx: 0.5 }}>{item}</Button>
=======
          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", ml: 4 }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  to={item.path}
                  sx={{ color: "inherit", mx: 0.5 }}
                >
                  {item.name}
                </Button>
>>>>>>> 6c975db697c71bd724e2e7c1f02bab8cd6958bd1
              ))}
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }} />

<<<<<<< HEAD
=======
          {/* Search Bar */}
>>>>>>> 6c975db697c71bd724e2e7c1f02bab8cd6958bd1
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
<<<<<<< HEAD
            <StyledInputBase placeholder="Search..." inputProps={{ "aria-label": "search" }} />
          </Search>

=======
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          {/* Cart Icon */}
>>>>>>> 6c975db697c71bd724e2e7c1f02bab8cd6958bd1
          <IconButton color="inherit">
            <Badge badgeContent={2} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

<<<<<<< HEAD
          <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          <Button variant="contained" color="primary" sx={{ ml: 2, borderRadius: 2, "&:hover": { bgcolor: "primary.dark" } }}>
=======
          {/* Theme Toggle Button */}
          <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>

          {/* Login Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{
              ml: 2,
              borderRadius: 2,
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
>>>>>>> 6c975db697c71bd724e2e7c1f02bab8cd6958bd1
            Login
          </Button>
        </Toolbar>

<<<<<<< HEAD
=======
        {/* Mobile Navigation Drawer */}
>>>>>>> 6c975db697c71bd724e2e7c1f02bab8cd6958bd1
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </AppBar>
    </Slide>
<<<<<<< HEAD
  )
=======
  );
>>>>>>> 6c975db697c71bd724e2e7c1f02bab8cd6958bd1
}
