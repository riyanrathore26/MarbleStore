const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

mongoose.connect('mongodb://localhost:27017/MarbleStore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Specify the collection name for the User model
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
}, { collection: 'Signup_data' }); // Specify the collection name here

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());
app.use(cors());

app.post('/signup', async (req, res) => {
    const { username,email, password } = req.body;
    console.log(username,email,password);
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
    console.log(email,password);
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
