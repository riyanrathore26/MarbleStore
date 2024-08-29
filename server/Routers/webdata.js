const express = require('express');
const router = express.Router();

router.post('/homeposter', async (req, res) => {
    try {
        console.log("hi");
        const poster = [
            "https://marblestorebucket0786.s3.ap-south-1.amazonaws.com/Marbles_img/download.png",
            "https://marblestorebucket0786.s3.ap-south-1.amazonaws.com/Marbles_img/poster2.png",
            "https://marblestorebucket0786.s3.ap-south-1.amazonaws.com/Marbles_img/posterr3.png"
        ];
        // Send the poster array as a response
        res.json({ poster });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;