import {
    Container,
    Grid,
    Typography,
    Box,
    Paper,
    Avatar,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    // Divider,
  } from '@mui/material'
  import {
    Person,
    Book,
    // Bookmark,
    Settings,
    History,
  } from '@mui/icons-material'
  
  export default function Profile() {
    const user = {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'reader',
      joinDate: '2024-01-01',
      booksRead: 42,
      favoriteGenres: ['Science Fiction', 'Technology', 'Philosophy'],
    }
  
    return (
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{ width: 100, height: 100, mb: 2 }}
                  src="/placeholder-avatar.jpg"
                />
                <Typography variant="h5" gutterBottom>
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  startIcon={<Settings />}
                >
                  Edit Profile
                </Button>
              </Box>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText
                    primary="Account Type"
                    secondary={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Book />
                  </ListItemIcon>
                  <ListItemText
                    primary="Books Read"
                    secondary={user.booksRead}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <History />
                  </ListItemIcon>
                  <ListItemText
                    primary="Member Since"
                    secondary={new Date(user.joinDate).toLocaleDateString()}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
  
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Reading History
              </Typography>
              <List>
                {/* Add reading history items here */}
              </List>
            </Paper>
  
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Bookmarks
              </Typography>
              <List>
                {/* Add bookmarked books here */}
              </List>
            </Paper>
  
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                AI Feature Usage
              </Typography>
              {/* Add AI feature usage statistics here */}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    )
  }