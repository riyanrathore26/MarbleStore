const express = require('express');
const router = express.Router();
const { cognito } = require('../config/awsConfig');
const addtocart  = require('../Models/addtocart');

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
