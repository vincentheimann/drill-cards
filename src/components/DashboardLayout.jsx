/* eslint-disable react/prop-types */
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  CssBaseline,
  Toolbar,
  AppBar as MuiAppBar,
  Typography,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Home,
  MenuBook,
  ExpandMore,
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material"; // Import icons
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import DrillCardList from "./DrillCardList"; // Import DrillCardList

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const DashboardLayout = ({ children }) => {
  const theme = useTheme();
  const location = useLocation(); // Get the current location
  const [open, setOpen] = React.useState(false); // Set default state to false

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const drawer = (
    <div>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem button component={Link} to="/" onClick={handleDrawerClose}>
          <ListItemIcon>
            <Home /> {/* Home icon */}
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/german"
          onClick={handleDrawerClose}
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
          onClick={handleDrawerClose}
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
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Language Learning
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        {drawer}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
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
      </Main>
    </Box>
  );
};

export default DashboardLayout;
