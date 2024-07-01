import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, Box, Typography } from "@mui/material";
import { verifyInvitationCode, clearError } from '../../redux/reducers/actions/careTeam.actions.js';

/**
 * CreateOrJoinCareTeam Component
 * 
 * This component allows users to either create a new care team by adding a loved one,
 * or join an existing care team using an invitation code.
 * 
 * @component
 * 
 * Troubleshooting:
 * 1. If routing doesn't work after successful verification, check:
 *    - The `verificationSuccessful` state in Redux
 *    - The useEffect hook watching for `verificationSuccessful`
 *    - The `history.push` call to ensure the route is correct
 * 2. If the error state persists, verify the `clearError` action is dispatched properly
 * 3. For performance issues, consider memoizing the component or its child components
 * 
 * Maintenance:
 * - Regularly update MUI and other dependencies to ensure compatibility
 * - If adding new features, consider breaking down into smaller components
 * - Ensure error messages are clear and user-friendly
 * - Consider adding more comprehensive form validation if needed
 */
function CreateOrJoinCareTeam() {
  // Local state
  const [invitationCode, setInvitationCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hooks
  const history = useHistory();
  const dispatch = useDispatch();
  
  // Redux state
  const careTeamState = useSelector(state => state.careTeam);
  const error = careTeamState?.error || "";
  const verificationSuccessful = careTeamState?.verificationSuccessful || false;

  /**
   * Handles navigation to the form for adding a new loved one.
   * 
   * Troubleshooting: If navigation fails, check:
   * 1. The route defined in your router configuration
   * 2. Any guards or middleware that might prevent navigation
   */
  const handleCreateLovedOne = () => {
    history.push("/lovedoneform");
  };

  /**
   * Handles the submission of the invitation code.
   * 
   * @param {Event} e - The form submission event
   * 
   * Troubleshooting:
   * 1. If the action isn't dispatched, check the dispatch function and action creator
   * 2. Verify that the invitationCode state is being updated correctly
   * 3. If setIsSubmitting doesn't work, check for any conflicting state updates
   */
  const handleSubmitInvitationCode = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("sending invitation code: ", invitationCode);
    dispatch(verifyInvitationCode(invitationCode));
  };

  /**
   * Effect hook to handle successful verification or error states
   * 
   * Troubleshooting:
   * 1. If navigation doesn't occur on successful verification, check:
   *    - The verificationSuccessful value in the Redux state
   *    - The '/careteamform' route in your router configuration
   * 2. If isSubmitting isn't reset on error, verify the error state is being updated in Redux
   */
  useEffect(() => {
    if (verificationSuccessful) {
      alert('You have joined the team!');
      history.push('/careteamform');

    } else if (error) {
      setIsSubmitting(false);
    }
  }, [verificationSuccessful, error, history]);

  /**
   * Effect hook to clear errors when component unmounts
   * 
   * Maintenance:
   * - Ensure this cleanup is still necessary if error handling logic changes
   * - If adding more cleanup logic, consider creating a separate cleanup function
   */
  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Care Team Setup
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Button
          variant="contained"
          color="tertiary"
          onClick={handleCreateLovedOne}
          fullWidth
        >
          Add a new Loved One
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom>
        Or
      </Typography>

      {/* 
        Form for submitting invitation code
        
        Troubleshooting:
        1. If form submission doesn't work, check the onSubmit handler
        2. For styling issues, verify MUI theme configuration
        3. If error messages don't display, check the error prop and helperText
      */}
      <form onSubmit={handleSubmitInvitationCode}>
        <TextField
          fullWidth
          label="Invitation Code"
          variant="outlined"
          value={invitationCode}
          onChange={(e) => setInvitationCode(e.target.value)}
          sx={{ mb: 2 }}
          error={!!error}
          helperText={error}
          disabled={isSubmitting}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          className={invitationCode ? "primary" : "primary off"}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Joining..." : "Join an Existing Care Team"}
        </Button>
      </form>
    </Box>
  );
}

export default CreateOrJoinCareTeam;