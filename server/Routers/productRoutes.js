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

// Update product route
router.put('/updateProduct/:id', upload.array('images', 13), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, images } = req.body;
    const imagePaths = images ? [...images] : [];
    console.log("id",id,"name",name,"description",description,"price",price,"images",imagePaths);
    const updatedProduct = {
      name,
      description,
      price,
      images: imagePaths,
    };

    const result = await Post.findByIdAndUpdate(id, updatedProduct, { new: true });

    if (!result) {
      return res.status(404).send('Product not found');
    }

    res.status(200).send('Product updated successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/deleteProduct/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Attempt to delete the product from the database
    const result = await Post.findByIdAndDelete(id);

    if (result) {
      res.status(200).send('Product deleted successfully');
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
