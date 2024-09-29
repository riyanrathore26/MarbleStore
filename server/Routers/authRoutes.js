const express = require('express');
const router = express.Router();
const { cognito } = require('../config/awsConfig');
const AWS = require('aws-sdk');
const User = require('../Models/userinfo');

// Explicitly set AWS region globally
AWS.config.update({
  region: process.env.AWS_REGION || 'ap-south-1',
});


router.post('/signup', async (req, res) => {
  const { username, email, password, phonenumber, gender } = req.body;
  let mobilenumber = phonenumber;

  // Remove all spaces from the phone number
  mobilenumber = mobilenumber.replace(/\s+/g, '');

  // Add +91 if it doesn't already start with it
  if (!mobilenumber.startsWith('+91')) {
    mobilenumber = `+91${mobilenumber}`;
  }
  const params = {
    ClientId: process.env.AWS_CLIENT_ID || 'jr9vl0cjsv7h8liq5tt43r57o',
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'name', Value: username },
      { Name: 'phone_number', Value: phonenumber }
    ]
  };

  const newUser = new User({
    username: username,
    phonenumber: mobilenumber,
    email,
    password,
    gender,
  });
  try {
    const data = await cognito.signUp(params).promise();
    console.log(data);
    await newUser.save();
    res.json(data);
  } catch (err) {
    console.error('Signup Error:', err);
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
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});
router.post('/addtocart/:id', async (req, res) => {
  const id = req.params.id;
  const user_email = 'rk5098863@gmail.com';

  const newProduct = new addtocart({
    product_id: id,
    user_email: user_email
  });

  try {
    await newProduct.save();
    console.log("Product added");
    res.status(200).send("Product added to cart successfully");  // Send a success response
  } catch (error) {
    console.log("Error adding product to cart:", error);
    res.status(500).send("Failed to add product to cart");  // Send a failure response
  }
});

module.exports = router;
