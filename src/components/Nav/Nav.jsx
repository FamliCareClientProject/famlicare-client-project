import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Box, Tabs, Tab, useTheme } from "@mui/material";
import famliCareLogo from "./PRIMARY_Horiz.png";

function Nav() {
  const user = useSelector((store) => store.user);
  const theme = useTheme();
  const location = useLocation(); // To determine the current route

  const appBarHeight = '110px';

  // Function to map routes to tab values
  const getTabValue = (path) => {
    switch (path) {
      case "/user":
        return 0;
      case "/messages":
        return 1;
      case "/info":
        return 2;
      case "/lovedoneform":
        return 3;
      case "/careteamform":
        return 4;
      default:
        return false;
    }
  };

// Custom styles for Tabs
const tabStyles = {
  backgroundColor: theme.palette.primary.main, //set the background color to the primary color (in the current theme it's dark teal)
  color: theme.palette.common.white,
  height: '100%', // Ensure Tabs fill the AppBar height. Adjust if AppBar height changes.
  typography: theme.typography.h2, // Set typography to match design specs. Consider adjusting for responsiveness.
  border: 1, // Apply a border around Tabs for visual separation.
  borderColor: 'divider', // Use theme's divider color for consistency.
  borderRadius: 1, // Apply rounded corners at the top for aesthetic consistency.
  '& .MuiTab-root': { // Target the root of the Tab component for detailed styling.
    color: 'inherit',
    borderTop: '1px solid', // Top border for visual definition.
    borderLeft: '1px solid', // Left border for visual definition.
    borderRight: '1px solid', // Right border for visual definition.
    borderColor: 'divider', // Use theme's divider color for borders for consistency.
    borderTopLeftRadius: '10px', // Rounded top left corner for a softer look.
    borderTopRightRadius: '10px', // Rounded top right corner for a softer look.
    position: 'relative', // Needed for positioning the pseudo-element for the curve effect.
    '&::after': { // Pseudo-element for the outward curve effect at the bottom of the tab.
      content: '""',
      position: 'absolute',
      bottom: 0, // Position at the bottom of the tab.
      left: 0,
      right: 0,
      height: '5px', // Height of the curve effect.
      borderRadius: '0 0 10px 10px', // Inverted border-radius for the outward curve.
      background: theme.palette.primary.main, // Use a contrasting background color for the curve effect.
    },
  },
  '&.Mui-selected': {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.dark,
  }
};

// Apply `tabStyles` to the Tabs component in your return statement
// Example: <Tabs value={getTabValue(location.pathname)} sx={tabStyles}>

  return (
    <AppBar position="static" color="white" sx={{ marginBottom: theme.spacing(2) }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <NavLink to="/home" style={{ textDecoration: "none", color: theme.palette.text.primary }}>
            <img src={famliCareLogo} alt="FamliCare Logo" style={{ maxHeight: "100px", backgroundColor: "white", borderRadius: 18 }} />
          </NavLink>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          {!user.id ? (
            <Tabs value={false} sx={tabStyles}>
              <Tab label="Login / Register" component={NavLink} to="/login" />
            </Tabs>
          ) : (
            <Tabs value={getTabValue(location.pathname)} indicatorColor="secondary" textColor="inherit" sx ={tabStyles}>
              <Tab label="Home" component={NavLink} to="/user" />
              <Tab label="💬 Messages" component={NavLink} to="/messages" />
              <Tab label="Info Page" component={NavLink} to="/info" />
              <Tab label="Loved one Form" component={NavLink} to="/lovedoneform" />
              <Tab label="CareTeamForm" component={NavLink} to="/careteamform" />
            </Tabs>
          )}
        </Box>
        {user.id && <LogOutButton color="secondary" />}
      </Toolbar>
    </AppBar>
  );
}

export default Nav;