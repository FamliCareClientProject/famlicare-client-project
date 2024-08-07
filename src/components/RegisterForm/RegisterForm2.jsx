import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { API_BASE_URL } from "../../redux/sagas/careVault.saga"

function RegisterForm2() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();
  const fileInputRef = useRef(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  const uploadImageToS3 = async () => {
    if (!selectedFile) {
      console.error("No file selected for upload.");
      return;
    }

    setLoading(true);
    setSuccessMessage("");

    try {
      // Step 1: Get a pre-signed URL from the backend
            const presignedUrlResponse = await axios.get(
        `${API_BASE_URL}/presigned-url`,
        {
          params: {
            fileName: selectedFile.name,
            useType: "upload",
          },
        }
      );

      const { url, fields } = presignedUrlResponse.data;

      // Step 2: Use the pre-signed URL to upload the file
      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("file", selectedFile);

      const uploadResponse = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload successful", uploadResponse.data);

      // Dispatch the image URL to the reducer
      dispatch({
        type: "IMAGE_SELECTED",
        payload: uploadResponse.data.location, // Assuming the response contains the URL in `location`
      });

      setSuccessMessage("Upload successful! Click next to continue.");
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setLoading(false);
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
          style={{ display: "none" }}
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
          disabled={!selectedFile || loading}
          className={!selectedFile ? "primary off" : "primary"}
        >
          {loading ? <CircularProgress size={24} /> : "Submit Image"}
        </Button>
        {successMessage && (
          <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
            {successMessage}
          </Typography>
        )}
        {previewURL && (
          <Box sx={{ mt: 2 }}>
            <Typography>Preview:</Typography>
            <img
              src={previewURL}
              alt="Preview"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Box>
        )}
      </Box>
    </>
  );
}

export default RegisterForm2;