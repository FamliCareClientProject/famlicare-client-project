import React from "react";
import { useSelector } from "react-redux";
import { Typography, Button, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// LovedOne_Review component displays a summary of the information entered for a loved one.
// It allows users to review the details before confirming submission.
export default function LovedOne_Review({ onSubmit, onPrevStep }) {
  const theme = useTheme();
  // Accessing the lovedOne state from the Redux store.
  const lovedOne = useSelector((state) => state.lovedOne);

  // Handles the submission of the loved one's information.
  // This function is triggered when the "Confirm Submission" button is clicked.
  const handleSubmit = () => {
    // Pass the entire lovedOne object to the onSubmit function for processing or API calls.
    onSubmit(lovedOne);
  };

  return (
    <Box sx={{ padding: theme.spacing(2) }}>
      <Typography variant="h5" gutterBottom>
        {lovedOne.first_name}'s Information
      </Typography>
      {/* Displaying the loved one's basic information for review. */}
      <Typography>
        <strong>Name:</strong> {lovedOne.first_name} {lovedOne.last_name}
      </Typography>
      <Typography>
        <strong>Age:</strong> {lovedOne.age}
      </Typography>
      <Typography>
        <strong>Main Medical Conditions:</strong> {lovedOne.main_condition}
      </Typography>
      <Typography>
        <strong>Address:</strong>
      </Typography>
      {/* Indented address block for better readability. */}
      <Box sx={{ marginLeft: theme.spacing(2) }}>
        <Typography>{lovedOne.street_address}</Typography>
        {/* Conditionally rendering the second address line if it exists. */}
        {lovedOne.street_address2 && (
          <Typography>{lovedOne.street_address2}</Typography>
        )}
        <Typography>{`${lovedOne.city}, ${lovedOne.state_province} ${lovedOne.postal_code}`}</Typography>
        <Typography>{lovedOne.country}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: theme.spacing(2),
        }}
      >
        {/* Button to navigate back to the previous step. */}
        <Button variant="text" onClick={onPrevStep}>
          Previous Step
        </Button>
        {/* Button to confirm the submission of the loved one's information. */}
        <Button variant="contained" color="primary" onClick={() => handleSubmit()}>
          Confirm Submission
        </Button>
      </Box>
    </Box>
  );
}