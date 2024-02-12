const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const AWS = require('aws-sdk');
const path = require('path');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

require('dotenv').config();


const bucketName = "marblestorebucket";

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-south-1'
};

const S3 = new AWS.S3(awsConfig);

const uploadToS3 = (fileData) => {
  return new Promise((resolve, reject) => {
      const params = {
          Bucket: bucketName,
          Key: `Marbles_img/${fileData.originalname}`,
          Body: fileData.buffer, // Extract the buffer from the file object
      };
      S3.upload(params, (err, data) => {
          if (err) {
              return reject(err);
          }
          console.log(data.Location);
          return resolve(data);
      });
  });
};


mongoose.connect(process.env.Mongodb_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useUnifiedTopology:true,
}).then(() => {
}).catch((err) => console.log(err));

const postSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  images: [String],
});

const Post = mongoose.model('Post', postSchema, 'Posts');

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

const userSchema = new mongoose.Schema({
  displayName: String,
  email: String,
  password: String,
}, { collection: '`Signup_data`' }); // Specify the collection name here

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());
app.use(cors());


// Serve images from the public folder
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// ... rest of your server code


app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

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
  

  app.post('/upload', upload.array('images', 3), async (req, res) => {
    try {
        const { name, description, price } = req.body;

        // Wait for all promises to resolve before processing
        const imagePaths = (await Promise.all(req.files.map(async file => {
            if (file && file.originalname) {
                const urlimg = await uploadToS3(file);
                console.log(urlimg);
                console.log(urlimg.Location);
                return urlimg.Location;
            }
            return null;
        }))).flat(); // Flatten the array of arrays

        console.log(imagePaths);

        // Now that all promises have resolved and the array is flattened, you can proceed with saving the data
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

app.use(bodyParser.json());
app.use(cors());

app.post('/signup', async (req, res) => {
    const { displayName, email, password } = req.body;
    console.log(displayName, email, password);
    const newUser = new User({
        displayName,
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


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const users = await User.find();
    // console.log("JI",users);
    for (const user of users) {
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