import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import PhotoCamera from '@mui/icons-material/PhotoCamera';

function RegisterForm2() {
  const [selectedFile, setSelectedFile] = useState(null);
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadImageToS3 = async () => {//TODO fix upload function to enable upload to work.
    if (!selectedFile) {
      // Maintenance: Add error handling for no file selected
      console.error("No file selected for upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Replace 'your-upload-url' with your actual S3 bucket upload URL
      const response = await axios.post('your-upload-url', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Dispatch success action or navigate to another page upon success
      // Maintenance: Update with actual dispatch or navigation as needed
      console.log("Upload successful", response.data);
    } catch (error) {
      // Maintenance: Implement error handling strategy
      console.error("Upload failed", error);
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
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Upload Profile Picture
        </Typography>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          style={{ display: 'none' }}
        />
        <Button
          variant="contained"
          component="label"
          sx={{ mt: 2 }}
          startIcon={<PhotoCamera />}
          color="tertiary"
        >
          Upload Image
          <input
            type="file"
            hidden
            onChange={handleFileSelect}
            accept="image/*"
          />
        </Button>
        <Button 
          variant="contained" 
          onClick={uploadImageToS3} 
          sx={{ mt: 2 }}
          disabled={!selectedFile}
          className={!selectedFile ? "primary off": "primary"}>
          Submit Image
        </Button>
      </Box>
    </>
  );
}

export default RegisterForm2;