import React from "react";
import { NavLink } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
// import "./Nav.css";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Box, Button, useTheme } from "@mui/material";
import famliCareLogo from './PRIMARY_Horiz.png';

function Nav() {
  const user = useSelector((store) => store.user);
  const theme = useTheme();

  // Define the common styling properties for the buttons
const buttonStyle = {
  typography: 'h2', 
  margin: theme.spacing(1),
  backgroundColor: 'white', // Assuming you want all buttons to have a white background
  borderRadius: 2, // Example of adding borderRadius
  boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)', // Example boxShadow
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
};

  return (
    <AppBar
      position="static"
      color="primary"
      sx={{ marginBottom: theme.spacing(2) }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center"}}>
          <NavLink
            to="/home"
            style={{
              textDecoration: "none",
              color: theme.palette.text.primary,
            }}
          >
            <img
              src={famliCareLogo}
              alt="FamliCare Logo"
              style={{ maxHeight: "100px", backgroundColor: "white", borderRadius: 18}}
            />
          </NavLink>
        </Box>
        <Box>
          {!user.id && (
            <Button color="secondary" component={NavLink} to="/login" sx={{ typography: 'h2', margin: theme.spacing(1)}}>
              Login / Register
            </Button>
          )}
          {user.id && (
            <>
              <Button color="inherit" component={NavLink} to="/user" sx={{ typography: 'h2', margin: theme.spacing(1)}}>
                Home
              </Button>
              <Button color="inherit" component={NavLink} to="/messages" sx={{ typography: 'h2', margin: theme.spacing(1)}}>
                💬 Messages
              </Button>
              <Button color="inherit" component={NavLink} to="/info" sx={{ typography: 'h2', margin: theme.spacing(1)}}>
                Info Page
              </Button>
              <Button color="inherit" component={NavLink} to="/lovedoneform" sx={{ typography: 'h2', margin: theme.spacing(1)}}>
                Loved one Form
              </Button>
              <Button color="inherit" component={NavLink} to="/careteamform" sx={{ typography: 'h2', margin: theme.spacing(1)}}>
                CareTeamForm
              </Button>
              <LogOutButton color="secondary" className="primary"/>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
