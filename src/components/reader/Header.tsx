"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  InputBase,
  // Badge,
  IconButton,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  Divider,
  Slide,
  useScrollTrigger,
} from "@mui/material";
import {
  Search as SearchIcon,
  // ShoppingCart as ShoppingCartIcon,
  Menu as MenuIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import apolloLogo from "../../assets/apollo-logo.png";

// Search Bar Styling
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
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
    margin: "0 auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  right: theme.spacing(2),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  padding: theme.spacing(1, 1, 1, 4),
  transition: theme.transitions.create("width"),
}));

// Navigation items
const navItems = [
  { name: "Home", path: "/reader/dashboard" },
  { name: "My Library", path: "../library/dashboard" },
  { name: "Explore", path: "../Explore/dashboard" },
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
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", p: 2 }}>
      {/* Logo */}
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <img
          src={apolloLogo || "/placeholder.svg"}
          alt="Apollo Logo"
          style={{ height: 40 }}
        />
        <Typography variant="h6" sx={{ ml: 1, fontWeight: "bold" }}>
          APOLLO
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />

      {/* Search Bar (Added to Mobile Menu) */}
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search..."
          inputProps={{ "aria-label": "search" }}
        />
      </Search>

      <List sx={{ mt: 2 }}>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <Button
              fullWidth
              component={Link}
              to={item.path}
              sx={{
                textAlign: "center",
                color: "inherit",
                fontSize: "1rem",
                py: 1,
              }}
            >
              {item.name}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={isScrolled ? 4 : 0}
        sx={{
          bgcolor: isScrolled ? "background.default" : "transparent",
          transition: theme.transitions.create([
            "background-color",
            "box-shadow",
          ]),
        }}
      >
        <Toolbar>
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <img
              src={apolloLogo || "/placeholder.svg"}
              alt="Apollo Logo"
              style={{ height: 40 }}
            />
            <Typography variant="h6" sx={{ ml: 1, fontWeight: "bold" }}>
              APOLLO
            </Typography>
          </Box>

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
              ))}
            </Box>
          )}

          {/* Search Bar (Only Show in Desktop) */}
          {!isMobile && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search..."
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          )}

          {/* Cart Icon */}
          {/* <IconButton color="inherit">
            <Badge badgeContent={2} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton> */}

          {/* Theme Toggle Button */}
          <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>

          {/* Profile Button */}
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="../other/PersonCard"
            sx={{
              ml: 2,
              borderRadius: 2,
              px: 2,
              py: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
              textTransform: "none",
              "&:hover": { bgcolor: "primary.dark" },
            }}
            startIcon={<AccountCircleIcon />}
          >
            Profile
          </Button>
        </Toolbar>

        {/* Mobile Drawer */}
        <Drawer
          anchor="left"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 280 },
          }}
        >
          {drawer}
        </Drawer>
      </AppBar>
    </Slide>
  );
}
