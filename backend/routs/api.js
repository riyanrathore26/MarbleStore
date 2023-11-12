// Example route in api.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add similar routes for other CRUD operations
