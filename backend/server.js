const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');


const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/MarbleStore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});



// Serve images from the public folder
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// ... rest of your server code


app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        console.log(posts);
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const postSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    images: [String],
});

const Post = mongoose.model('Post', postSchema, 'Posts');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const storage2 = multer.diskStorage({
    destination: 'public/images', // Set your desired destination folder
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload2 = multer({ storage: storage2 }); // Use 'storage' instead of 'storage2'
  
  // Handle the image upload endpoint
  app.post('/api/upload', upload2.array('image'), (req, res) => {
    // File is uploaded successfully
    res.json({ message: 'Image uploaded successfully' });
  });
  

app.post('/upload', upload.array('images'), async (req, res) => {
    try {
      const { name, description, price } = req.body;
  
      // Check if req.files is an array and not empty
      const imagePaths = req.files.map(file => {
        if (file && file.originalname) {
          return file.originalname;
        }
        return null;
      }).filter(path => path !== null);
  
      const newProduct = new Post({
        name,
        description,
        price,
        images: imagePaths,
      });
  
      await newProduct.save();
  
      res.status(201).send('Product added successfully!');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  
  

// Specify the collection name for the User model
//Schema for Signup Page
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
}, { collection: 'Signup_data' }); // Specify the collection name here

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());
app.use(cors());

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    const newUser = new User({
        username,
        email,
        password,
    });

    try {
        await newUser.save();
        res.json({ message: 'Signup successful!' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Error occurred during signup.' });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const user = await User.findOne({ email });
        console.log(user);

        if (user) {
            // If the user exists, compare the provided password with the stored hash
            const isPasswordValid = user.password === password; // This assumes passwords are stored as plain text, not recommended for production
            console.log(isPasswordValid);
            if (isPasswordValid) {
                // Successful login
                res.json({ message: 'Login successful!' });
            } else {
                // Incorrect password
                res.status(401).json({ message: 'Invalid email or password.' });
            }
        } else {
            // User not found
            res.status(401).json({ message: 'Invalid email or password.' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error occurred during login.' });
    }
});


  


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


