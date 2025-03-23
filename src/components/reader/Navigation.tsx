import { useState, useCallback } from "react";
import debounce from "lodash/debounce";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  Tooltip,
  InputBase,
  CircularProgress
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { Search as SearchIcon, AccountCircle, Brightness4, Brightness7, Clear as ClearIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: theme.spacing(4),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

interface NavigationProps {
  onSearch: (query: string) => void;
  themeMode: 'light' | 'dark';
  onThemeChange: (mode: 'light' | 'dark') => void;
}

export default function Navigation({ onSearch, themeMode, onThemeChange }: NavigationProps) {
  const menuId = "primary-search-account-menu";
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      setIsSearching(true);
      await onSearch(query);
      setIsSearching(false);
    }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    onSearch("");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              display: { xs: "none", sm: "block" },
              textDecoration: "none",
              color: "inherit",
            }}
          >
            APOLLO
          </Typography>

          <Search>
            <SearchIconWrapper>
              {isSearching ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <SearchIcon />
              )}
            </SearchIconWrapper>
            <StyledInputBase
              value={searchValue}
              placeholder="Search books..."
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearchChange}
              endAdornment={
                searchValue && (
                  <IconButton 
                    size="small" 
                    onClick={handleClearSearch}
                    sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                )
              }
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/library">
              Library
            </Button>
            <Button color="inherit" component={Link} to="/ai-features">
              AI Features
            </Button>

            <Tooltip title="Toggle Dark Mode">
              <IconButton
                onClick={() => onThemeChange(themeMode === "dark" ? "light" : "dark")}
                color="inherit"
              >
                {themeMode === "dark" ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Account settings">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
