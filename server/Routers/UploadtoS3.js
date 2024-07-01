const AWS = require('aws-sdk');
const Post = require('../Models/product');
const CommentModel = require('../Models/Comment');

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-south-1'
};

const S3 = new AWS.S3(awsConfig);

const uploadToS3 = (fileData) => {
  const bucketName = "marblestorebucket";
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: bucketName,
      Key: `Marbles_img/${fileData.originalname}`,
      Body: fileData.buffer, // Extract the buffer from the file object
    };
    S3.upload(params, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

module.exports = { uploadToS3 };
