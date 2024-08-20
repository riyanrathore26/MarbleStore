const express = require('express');
const multer = require('multer');
const { uploadToS3 } = require('./UploadtoS3');
const Post = require('../Models/product');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/addProduct', upload.array('images', 13), async (req, res) => {
  try {
    const { name, description, price,tags } = req.body;
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
      tags,
    });

    await newProduct.save();
    console.log("product added");
    res.status(200).json({ message: 'product added' });
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
router.get('/fetchsimilar/:tags/:id', async (req, res) => {
  try {
    const tags = req.params.tags.split(',');
    const id = req.params.id;  // The ID to exclude from the results

    let info = [];
    let productSet = new Set();  // Set to keep track of unique products

    for (let index = 0; index < tags.length; index++) {
      const element = tags[index];

      // Find products with tags matching the current tag
      const data = await Post.find({ tags: { $regex: element, $options: "i" } });

      // Iterate over the found products
      data.forEach((product) => {
        // Exclude the product with the same ID as the one passed in params
        if (product._id.toString() !== id && !productSet.has(product._id.toString())) {
          productSet.add(product._id.toString());  // Add product ID to the set
          info.push(product);  // Add the product to the response array
        }
      });
    }

    res.status(200).json(info);  // Send the filtered products
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
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
router.put('/updateProduct/:id', upload.array('newImages', 13), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description,tags, price, existingImages } = req.body;
    // Parse existing images from JSON string
    const existingImagesArray = JSON.parse(existingImages || '[]');

    // Upload new images to S3
    const newImagePaths = await Promise.all(req.files.map(async (file) => {
      if (file && file.originalname) {
        const result = await uploadToS3(file);
        return result.Location;
      }
      return null;
    }));

    // Combine old and new images
    const allImages = [...existingImagesArray, ...newImagePaths.filter(Boolean)];
    const updatedProduct = {
      name,
      description,
      price,
      images: allImages,
      tags:tags,
    };

    const result = await Post.findByIdAndUpdate(id, updatedProduct, { new: true });

    if (!result) {
      return res.status(404).send('Product not found');
    }

    res.status(200).json({ message: 'product added' });
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
