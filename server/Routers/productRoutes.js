const express = require('express');
const multer = require('multer');
const { uploadToS3 } = require('./UploadtoS3');
const Post = require('../Models/product');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/addProduct', upload.array('images', 13), async (req, res) => {
  try {
    const { name, description, price } = req.body;

    const imagePaths = (await Promise.all(req.files.map(async file => {
      if (file && file.originalname) {
        const urlimg = await uploadToS3(file);
        return urlimg.Location;
      }
      return null;
    }))).flat();

    const newProduct = new Post({
      name,
      description,
      price,
      images: imagePaths,
    });

    await newProduct.save();
    console.log("product added");
    res.status(201).send('Product added successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/showProduct', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/fetchone/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Post.findById(id);
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/api/search', async (req, res) => {
  try {
    console.log("jio");
    const { searchTerm } = req.body;
    console.log(searchTerm);
    res.json({ searchTerm });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
