const express = require("express");
const { Product, validateProduct } = require("../models/product");
const router = express.Router();
const _ = require("lodash");

router.post("/", async (req, res) => {
  const { err } = validateProduct(req.body);
  if (err) {
    return res.status(401).send({
      success: false,
      message: err.details[0].message,
    });
  }

  let product = new Product(req.body);
  await product.save();
  res.send({
    success: true,
    data: product,
  });
});

router.get("/", async (req, res) => {
  const products = await Product.find({ isDeleted: false });
  res.send({
    success: true,
    data: products,
  });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { err } = validateProduct(req.body);
  if (err) {
    return res.status(401).send({
      success: false,
      message: err.details[0].message,
    });
  }

  let product = await Product.findOneAndUpdate({ _id: id }, req.body);
  if (!product) {
    return res.status(404).send({
      success: false,
      message: "Not found",
    });
  }

  product = await Product.findOne({ _id: id });
  res.send({
    success: true,
    data: product,
  });
});

router.delete("/:id", async (req, res) => {
  console.log(req);
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    { isDeleted: true }
  );
  if (!product) {
    return res.status(404).send({
      success: false,
      message: "Not found",
    });
  }
  res.send({
    success: true,
  });
});
module.exports = router;
