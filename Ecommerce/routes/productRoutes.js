const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  const search = req.query.search || "";

  const products = await Product.find({
    name: { $regex: search, $options: "i" },
    price: { $gte: 0 }
  });

  res.json(products);
});

module.exports = router;