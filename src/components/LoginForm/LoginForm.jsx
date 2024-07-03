import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Typography, Button } from '@mui/material';

// LoginForm component handles user login functionality.
// It uses Redux for state management and MUI for UI components.
function LoginForm() {
  // State hooks for managing username and password input fields.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Accessing the Redux store for error messages related to login.
  const errors = useSelector(store => store.errors);
  // useDispatch hook to dispatch actions to the Redux store.
  const dispatch = useDispatch();

  // login function is called when the form is submitted.
  // It dispatches a login action if both username and password are provided,
  // otherwise, it dispatches a login input error action.
  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      // Dispatches an error action if either username or password is missing.
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
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
          borderColor: "primary.main",
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
        onSubmit={login}
      >
        <Typography variant="h6">Login</Typography>
        {/* Display login error messages from the Redux store */}
        {errors.loginMessage && (
          <Typography className="alert" role="alert" color="error">
            {errors.loginMessage}
          </Typography>
        )}
        {/* Username input field */}
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
        </Box>
        {/* Password input field */}
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
        </Box>
        {/* Login button */}
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Login
        </Button>
      </Box>
    </>
  );
}

export default LoginForm;