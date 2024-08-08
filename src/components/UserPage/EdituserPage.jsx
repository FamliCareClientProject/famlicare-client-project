// Import necessary libraries and components
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Button,
  Avatar,
  Grid,
  TextField,
} from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack";

function EdituserPage() {
  // Hooks for navigation and accessing Redux store
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();

  // Extract user ID from URL parameters
  const id4userToedit = params.id;

  // Access user data from Redux store
  const user = useSelector((store) => store.user);
  const editUserprofile = useSelector((store) => store.editUserprofile);

  // Local state for profile image
  const [profileImage, setProfileImage] = useState(null);

  // Fetch user data for editing on component mount
  useEffect(() => {
    dispatch({
      type: "EDIT-USER-PROFILE",
      payload: id4userToedit,
    });
  }, [dispatch, id4userToedit]);

  // Handlers for form field changes, dispatch actions to update local state
  const handleNamechange = (event) => {
    dispatch({
      type: "CHANGE-CURRENT USERNAME",
      payload: event.target.value,
    });
  };

  const handleEmailchange = (event) => {
    dispatch({
      type: "CHANGE-CURRENT EMAIL",
      payload: event.target.value,
    });
  };

  const handlePhonechange = (event) => {
    dispatch({
      type: "CHANGE-CURRENT PHONE-NUMBER",
      payload: event.target.value,
    });
  };

  const handleFirstNameChange = (event) => {
    dispatch({
      type: "CHANGE-CURRENT FIRST-NAME",
      payload: event.target.value,
    });
  };

  const handleLastNameChange = (event) => {
    dispatch({
      type: "CHANGE-CURRENT LAST-NAME",
      payload: event.target.value,
    });
  };

  const handleProfileImageChange = (event) => {
    setProfileImage(event.target.files[0]);
  };

  const updateProfile = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", editUserprofile.username);
    formData.append("email", editUserprofile.email);
    formData.append("phone_number", editUserprofile.phone_number);
    formData.append("first_name", editUserprofile.first_name);
    formData.append("last_name", editUserprofile.last_name);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    dispatch({
      type: "UPDATE-USER-PROFILE",
      payload: formData,
    });

    history.push("/user");
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12} container alignItems="center">
          <Grid item>
            <Avatar
              sx={{ width: 100, height: 100 }}
              alt="Profile Picture"
              src={editUserprofile.image || ""}
            >
              {!editUserprofile.image && getInitials(editUserprofile.first_name, editUserprofile.last_name)}
            </Avatar>
          </Grid>
          <Grid item>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container alignItems="center">
          <Grid item xs={3}>
            <Typography variant="h6">Username</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              variant="outlined"
              value={editUserprofile.username || ""}
              onChange={handleNamechange}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container alignItems="center">
          <Grid item xs={3}>
            <Typography variant="h6">Email</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              variant="outlined"
              value={editUserprofile.email || ""}
              onChange={handleEmailchange}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container alignItems="center">
          <Grid item xs={3}>
            <Typography variant="h6">Phone Number</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              variant="outlined"
              value={editUserprofile.phone_number || ""}
              onChange={handlePhonechange}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container alignItems="center">
          <Grid item xs={3}>
            <Typography variant="h6">First Name</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              variant="outlined"
              value={editUserprofile.first_name || ""}
              onChange={handleFirstNameChange}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container alignItems="center">
          <Grid item xs={3}>
            <Typography variant="h6">Last Name</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              variant="outlined"
              value={editUserprofile.last_name || ""}
              onChange={handleLastNameChange}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container justifyContent="space-around" alignItems="center" style={{ marginTop: '20px' }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ArrowBack />}
            onClick={() => history.goBack()}
          >
            Back
          </Button>
          <Button variant="contained" onClick={updateProfile}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default EdituserPage;