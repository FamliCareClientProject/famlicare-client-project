import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import RegisterForm2 from "../RegisterForm/RegisterForm2";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function RegisterPage2() {
  const history = useHistory();
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);

  const handleSuccessMessage = (message) => {
    if (message === "Upload successful! Click next to continue.") {
      setIsUploadSuccessful(true);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Step 3: Upload Profile Picture
      </Typography>
      <Box sx={{ '& > button': { m: 1 } }}>
        <Button variant="outlined" color="primary" startIcon={<ArrowBackIcon />} onClick={() => history.goBack()}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIcon />}
          onClick={() => {
            history.push("/registerpage/registerpage3");
          }}
          disabled={!isUploadSuccessful}
        >
          Next
        </Button>
      </Box>
      <RegisterForm2 onSuccessMessage={handleSuccessMessage} />
    </Box>
  );
}

export default RegisterPage2;