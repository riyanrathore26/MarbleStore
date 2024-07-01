const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  region: process.env.AWS_REGION
});
const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports = { cognito };
