const express = require('express');
const router = express.Router();
const Post = require('../Models/product'); // Assuming the model is named 'Post'

router.post('/search', async (req, res) => {
  try {
    const { searchTerm } = req.body;

    // Query the database to find matching products
    const filteredProducts = await Post.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } }, // 'i' makes it case-insensitive
        { description: { $regex: searchTerm, $options: 'i' } }
      ]
    });

    res.json({ results: filteredProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
