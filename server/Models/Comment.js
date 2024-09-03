const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  Useremail: {
    type: String,
    required: true,
  },
  Username: {
    type: String,
    required: true,
  },
  datetime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('comment', CommentSchema);
