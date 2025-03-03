/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  CssBaseline,
  Toolbar,
  AppBar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Home, MenuBook, ExpandMore, Menu } from "@mui/icons-material"; // Import Home and Menu icons
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import DrillCardList from "./DrillCardList"; // Import DrillCardList

const drawerWidth = 240;

const DashboardLayout = ({ children }) => {
  const location = useLocation(); // Get the current location
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
          <ListItemIcon>
            <Home /> {/* Home icon */}
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/german"
          onClick={handleDrawerToggle}
        >
          <ListItemIcon>
            <MenuBook />
          </ListItemIcon>
          <ListItemText primary="German" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/german/b2"
          sx={{ pl: 4 }}
          onClick={handleDrawerToggle}
        >
          <ListItemIcon>
            <ExpandMore />
          </ListItemIcon>
          <ListItemText primary="B2" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            Language Learning
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {location.pathname === "/" ? (
          <>
            <Typography variant="h4">Welcome Home</Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/german/b2"
            >
              Go to German B2 Page
            </Button>
          </>
        ) : location.pathname === "/german" ? (
          <Typography variant="h4">We are on the German section</Typography> // Display text information in German component
        ) : location.pathname === "/german/b2" ? (
          <DrillCardList drillcards={[]} /> 
        ) : (
          children
        )}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
