import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Typography, Button, useTheme, Avatar, Grid, TextField, Box } from '@mui/material';

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailAddress, setemailAddress] = useState("");

  // Accessing the Redux store for error handling
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();

  // Function to handle user registration
  const signUp = () => {
    // Dispatching user details to the store
    dispatch({
      type: "USERNAME_EMAIL_PASSWORD",
      payload: {
        username: username,
        emailAddress: emailAddress,
        password: password,
      },
    });

    // Redirecting to the next page after successful registration
    history.push("/registerpage/registerpage1");
    // Maintenance: Ensure the redirection path is updated if the route changes
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          width: "fit-content",
          border: "2px solid",
          borderColor: "#2a788b",
          padding: 2,
          "& .MuiFormControl-root": {
            mt: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          },
        }}
        noValidate
        autoComplete="off"
      >
        {/* Username input */}
        <Box className="MuiFormControl-root">
          <Typography variant="h6" sx={{ mr: 2, minWidth: "120px" }}>
            Username
          </Typography>
          <TextField
            required
            id="username"
            label="Enter your username"
            variant="outlined"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            sx={{ flexGrow: 1 }}
          />
          {/* Troubleshooting: Ensure username meets backend validation criteria */}
        </Box>
        {/* Email address input */}
        <Box className="MuiFormControl-root">
          <Typography variant="h6" sx={{ mr: 2, minWidth: "120px" }}>
            Email Address
          </Typography>
          <TextField
            required
            id="emailAddress"
            label="Enter your email"
            variant="outlined"
            value={emailAddress}
            onChange={(event) => setemailAddress(event.target.value)}
            sx={{ flexGrow: 1 }}
          />
          {/* Maintenance: Validate email format before submission */}
        </Box>
        {/* Password input */}
        <Box className="MuiFormControl-root">
          <Typography variant="h6" sx={{ mr: 2, minWidth: "120px" }}>
            Password
          </Typography>
          <TextField
            required
            id="password"
            label="Enter your password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            sx={{ flexGrow: 1 }}
          />
          {/* Troubleshooting: Ensure password complexity meets security requirements */}
        </Box>
      </Box>
      {/* Sign Up button */}
      <Button
        variant="contained"
        className={username && emailAddress && password ? "primary" : "primary off"}
        onClick={signUp}
        disabled={!(username && emailAddress && password)}
      >
        Sign Up
      </Button>
      {/* Maintenance: Consider adding feedback for the user on successful or failed registration */}
    </>
  );
}

export default RegisterForm;