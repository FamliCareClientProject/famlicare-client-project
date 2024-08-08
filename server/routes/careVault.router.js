require("dotenv").config(); // Loads environment variables from a .env file into process.env.
const express = require("express");
const router = express.Router();
const multer = require("multer"); // Used for handling multipart/form-data, primarily used for uploading files.
const pool = require("../modules/pool"); // Pooling client connections to PostgreSQL database.
const { isAdmin } = require("../modules/isAdmin"); // Custom middleware to check if the user is an admin.
const passport = require("passport"); // Authentication middleware for Node.js.
const { rejectUnauthenticated } = require("../modules/authentication-middleware"); // Middleware to reject unauthenticated requests.
const { s3Uploadv2, getPresignedURL } = require("../utils/s3Utils"); // Importing S3 utility functions

// Setup multer for memory storage
const storage = multer.memoryStorage(); // Stores files in memory as Buffer objects.
const upload = multer({ storage }); // Initializes multer with memory storage.

// Example route to handle file upload
router.post("/upload", rejectUnauthenticated, upload.single("file"), async (req, res) => {
  try {
    const result = await s3Uploadv2(req.file);
    res.status(200).json({ url: result.Location });
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

// Example route to get a presigned URL
router.get("/presigned-url", rejectUnauthenticated, async (req, res) => {
  try {
    const { fileName, useType } = req.query;
    const url = getPresignedURL(fileName, useType);
    res.status(200).json({ url });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    res.status(500).json({ error: "Failed to generate presigned URL" });
  }
});

module.exports = router;