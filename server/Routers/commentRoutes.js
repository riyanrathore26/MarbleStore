const express = require('express');
const CommentModel = require('../Models/Comment');

const router = express.Router();

router.post('/addcomment', async (req, res) => {
  try {
    const { productId, comment, Useremail,Username } = req.body;
    const datetime = new Date();

    const newComment = new CommentModel({
      productId,
      comment,
      Useremail,
      Username,
      datetime,
    });

    await newComment.save();
    res.status(200).send({ message: 'Comment added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

router.get('/showcomments/:productId', async (req, res) => {
  const productId = req.params.productId;
  const commentsData = await CommentModel.find({ productId });
  res.json(commentsData);
});

module.exports = router;
