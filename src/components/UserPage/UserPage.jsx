import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Button,
  useTheme,
  Avatar,
  Grid,
  Paper,
} from "@mui/material";
import { useHistory } from "react-router-dom";

function UserPage() {
  const theme = useTheme();
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const editUserinfo = () => {
    history.push(`/update-user/${user.id}`);
  };

  const profileFields = [
    { label: "Username", value: user.username },
    { label: "Email", value: user.email },
    { label: "Name", value: user.firstName + " " + user.lastName },
    { label: "Phone Number", value: user.phoneNumber },
    { label: "User ID", value: user.id },
  ];

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, p: 3, bgcolor: 'primary.light', color: theme.palette.common.white }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar
              sx={{ width: 100, height: 100 }}
              alt="Profile Picture"
              src={user.image || ""}
            >
              {!user.image && getInitials(user.first_name, user.last_name)}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h4" gutterBottom>
              {user.first_name} {user.last_name}
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" className="primary" onClick={editUserinfo}>
              Edit Profile
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {profileFields.map((field) => (
            <React.Fragment key={field.label}>
              <Grid item xs={12} sm={3}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {field.label}:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography variant="body1">
                  {field.value}
                </Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}

export default UserPage;