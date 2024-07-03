import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Box, Button } from '@mui/material';

// LoginPage component serves as the entry point for user authentication.
// It renders the LoginForm component and provides an option to navigate to the registration page.
function LoginPage() {
  // useHistory hook from react-router-dom for navigation.
  const history = useHistory();

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      {/* LoginForm component handles the login functionality. */}
      <LoginForm />
      <Box sx={{ mt: 2 }}>
        {/* Button to navigate to the registration page. */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // Redirects the user to the registration page upon click.
            history.push('/registration');
          }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}

export default LoginPage;