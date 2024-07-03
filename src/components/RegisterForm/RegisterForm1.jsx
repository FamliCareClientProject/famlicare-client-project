import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, TextField, Button, Typography, useTheme, Avatar } from "@mui/material";

function RegisterForm1() {
  const [phoneNumber, setPhoneNumber] = useState("");

  // Access Redux store for error handling
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();

  const Continue = (event) => {
    event.preventDefault();

    // Dispatch phone number to the store
    dispatch({
      type: "PHONE_NUMBER",
      payload: {
        phoneNumber: phoneNumber,
      },
    });

    // Navigate to the next registration page
    history.push("/registerpage/registerpage2");
    // Maintenance: Ensure the navigation path is updated if the routing structure changes
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
      >
        <Box className="MuiFormControl-root">
          <Typography variant="h6" sx={{ mr: 2, minWidth: "120px" }}>
            Phone Number
          </Typography>
          <TextField
            label="Phone Number"
            variant="outlined"
            type="tel"
            name="phoneNumber"
            value={phoneNumber}
            required
            onChange={(event) => setPhoneNumber(event.target.value)}
            sx={{ flexGrow: 1 }}
          />
          {/* Troubleshooting: If phone number validation fails, ensure it meets backend requirements */}
        </Box>
      </Box>
      <Button
        variant="contained"
        className={phoneNumber ? "primary" : "primary off"}
        onClick={Continue}
        sx={{ mt: 2 }}
      >
        Continue
      </Button>
      {/* Maintenance: Consider implementing feedback for the user on successful or failed submission */}
    </>
  );
}

export default RegisterForm1;