// server/utils/s3Utils.js
const AWS = require("aws-sdk");
const multer = require("multer");

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// Function to upload files to AWS S3
const s3Uploadv2 = async (file, folder = 'uploads') => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${folder}/${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  return await s3.upload(params).promise();
};

// Function to generate a presigned URL for accessing a file
const getPresignedURL = (fileName, useType = 'view') => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Expires: 60 * 60 * 24,
  };

  if (useType === 'download') {
    params.ResponseContentDisposition = 'attachment';
  }

  return s3.getSignedUrl("getObject", params);
};

module.exports = {
  s3Uploadv2,
  getPresignedURL,
};