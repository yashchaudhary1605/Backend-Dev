const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: { type: Number, min: 0 }, 
  image: String
});

module.exports = mongoose.model("Product", productSchema);