const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
  },
  price: {
    type: String,
  },
  tags:{
    type:[String]
  },
  images: {
    type: [String],
  },
});

module.exports = mongoose.model('Post', ProductSchema);

