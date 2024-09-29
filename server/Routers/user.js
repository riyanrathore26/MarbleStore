const express = require('express');
const user = require('../Models/userinfo');
const { uploadToS3 } = require('./UploadtoS3')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

router.get('/profile/:email', async (req, res) => {
  try {
    const email = req.params.email;

    // Correct the query by using an object to specify the email field
    const data = await user.findOne({ email: email }); // findOne instead of find for a single result
    
    if (!data) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/edit/:id', upload.single('profilepic'), async (req, res) => {
  try {
    const id = req.params.id;
    const profileData = req.body;
    let profileUrl = '';

    // Upload the profile picture to S3 if provided
    if (req.file) {
      const fileData = {
        name: req.file.originalname,
        buffer: req.file.buffer,
      };
      const s3Response = await uploadToS3(fileData);
      profileUrl = s3Response.Location; // S3 returns the URL in 'Location'
    }
    console.log(profileUrl)
    // Prepare the updated profile data
    const updateProfile = {
      username: profileData.username,
      phonenumber: profileData.phonenumber,
      email: profileData.email,
      gender: profileData.gender,
      profilepic:profileUrl,
    };

    // Include the profile picture URL if it was uploaded
    if (profileUrl) {
      updateProfile.profilepic = profileUrl;
    }

    // Update the user profile in the database
    const result = await user.findByIdAndUpdate(id, updateProfile, { new: true });

    if (!result) {
      return res.status(404).send('Profile not found');
    }

    res.status(200).json({ message: 'Profile updated successfully', profile: result });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
