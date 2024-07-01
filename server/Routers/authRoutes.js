const express = require('express');
const router = express.Router();
const { cognito } = require('../config/awsConfig');

router.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;
  const params = {
    ClientId: process.env.AWS_CLIENT_ID,
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'name', Value:username },
    ]
  };

  try {
    const data = await cognito.signUp(params).promise();
    res.json(data);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
});

router.post('/verify', async (req, res) => {
  const { email, code } = req.body;

  const params = {
    ClientId: process.env.AWS_CLIENT_ID,
    Username: email,
    ConfirmationCode: code
  };

  try {
    const data = await cognito.confirmSignUp(params).promise();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("running...")
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.AWS_CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password
    }
  };

  try {
    const data = await cognito.initiateAuth(params).promise();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
