const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const http = require('http');
const crypto = require('crypto');
const util = require('util');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 5000;

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/MarbleStore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ... other middleware

app.post('/api/messages', async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;
    const newMessage = new Message({ sender, receiver, content });
    await newMessage.save();
    res.status(200).send('Message saved successfully');
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/messages/:sender/:receiver', async (req, res) => {
  try {
    const { sender, receiver } = req.params;
    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.use(bodyParser.json());
app.use(cors());


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
  
  const SellerSchema = new mongoose.Schema({
    SellerName: String,
    SellerAddress: String,
    SellerNumber: String,
    // SellerProfilePic: String,
    ProjectName: String,
    ProjectPrice: Number,
    ProjectDescription: String,
    SellerImages: [String],
});

const SellerModel = mongoose.model('Seller', SellerSchema);

app.post('/AddSeller', async (req, res) => {
    console.log(req.body);
    // const { SellerName, SellerAddress, SellerNumber,SellerImages, ProjectName, ProjectDescription,  ProjectPrice } = req.body;
    // console.log(req.body.name);

    const seller = new SellerModel({
        SellerName:req.body.name,
        SellerAddress:req.body.address,
        SellerNumber:req.body.phoneNumber,
        // SellerProfilePic,
        ProjectName:req.body.projectInfo.name,
        ProjectPrice:req.body.projectInfo.price,
        ProjectDescription:req.body.projectInfo.description,
        SellerImages:req.body.images,
    });

    try {
        await seller.save();
        res.json({ message: 'Signup successful!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/ShowSeller', async (req, res) => {
    try {
        const sellers = await SellerModel.find();
        res.json(sellers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
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
// Convert crypto.pbkdf2 to promise-based
const pbkdf2Async = util.promisify(crypto.pbkdf2);

// Your user model or schema should have a field 'passwordHash' to store the hashed password


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const users = await User.find();
    // console.log("JI",users);
    for (const user of users) {
      console.log("Comparing:", user.email, email, user.password, password);
      if (user.email === email || user.password === password) {
        // Successful login
        console.log("Working", user.email, user._id);
        return res.json({ message: 'Login successful!', userId: user._id });
      }
    }    
    // If no matching user is found
    console.log("Not working");
    res.status(401).json({ message: 'Invalid email or password.' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error occurred during login.' });
  }
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


