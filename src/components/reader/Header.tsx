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
  IconButton,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  Divider,
  Slide,
  useScrollTrigger,
  Paper,
  ListItemText,
} from "@mui/material";
import {
  Search as SearchIcon,
  Menu as MenuIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import apolloLogo from "../../assets/apollo-logo.png";
import axios from "axios";

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
  const [searchQuery, setSearchQuery] = useState("");
  interface Book {
    id: string;
    title: string;
    author?: string;
  }

  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    setShowDropdown(true);
    if (query.length >= 2) {
      try {
        const response = await axios.get<Book[]>(
          `http://crucial-lane-apollolibrary-9e92f19f.koyeb.app/api/v1/books/search?q=${query}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", p: 2 }}>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <img src={apolloLogo} alt="Apollo Logo" style={{ height: 40 }} />
        <Typography variant="h6" sx={{ ml: 1, fontWeight: "bold" }}>
          APOLLO
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search..."
          inputProps={{ "aria-label": "search" }}
          value={searchQuery}
          onChange={handleSearch}
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
          bgcolor: isScrolled ? "background.default" : "",
          transition: theme.transitions.create([
            "background-color",
            "box-shadow",
          ]),
          zIndex: 1400,
        }}
      >
        <Toolbar>
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
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <img src={apolloLogo} alt="Apollo Logo" style={{ height: 40 }} />
            <Typography variant="h6" sx={{ ml: 1, fontWeight: "bold" }}>
              APOLLO
            </Typography>
          </Box>

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

          {!isMobile && (
            <Box sx={{ position: "relative" }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search books..."
                  inputProps={{ "aria-label": "search" }}
                  value={searchQuery}
                  onChange={handleSearch}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 300)} // Close dropdown after focus loss
                  onFocus={() =>
                    searchQuery.length >= 2 && setShowDropdown(true)
                  }
                />
              </Search>

              {/* Search Results Dropdown */}
              {showDropdown && searchResults.length > 0 && (
                <Paper
                  elevation={4}
                  sx={{
                    position: "absolute",
                    top: 45,
                    left: 0,
                    width: "100%",
                    maxHeight: 300,
                    overflowY: "auto",
                    zIndex: 2000,
                  }}
                >
                  {searchResults.map((book: Book) => (
                    <ListItem
                      key={book.id}
                      component={Link}
                      to={`/book/${book.id}`} // Replace with your actual route
                      sx={{ px: 2, py: 1 }}
                      onClick={() => setShowDropdown(false)}
                    >
                      <ListItemText
                        primary={book.title}
                        secondary={book.author || ""}
                      />
                    </ListItem>
                  ))}
                </Paper>
              )}
            </Box>
          )}

          {/* Theme Toggle */}
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
            to="../other/Profile"
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

        <Drawer
          anchor="left"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 280,
              zIndex: 1500, // Ensure it's above other content
            },
          }}
        >
          {drawer}
        </Drawer>
      </AppBar>
    </Slide>
  );
}
