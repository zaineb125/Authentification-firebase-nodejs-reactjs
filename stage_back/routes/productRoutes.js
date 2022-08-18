const express = require("express");
const productController = require("./../controller/productController");
const { check, validationResult } = require("express-validator");
const router = express.Router();

router
  .route("/createProduct")
  .post(
    [
      check("name", "Name is required").notEmpty(),
      check("category", "Category is required").notEmpty(),
      check("price", "Price is required").notEmpty(),
      check("stock", "Stock is required").notEmpty(),
      check("price", "Price must be a number").isFloat(),
      check("stock", "Stock must be a number").isFloat(),
    ],
    productController.createProduct
  );
router
  .route("/updateProduct/:name")
  .post(
    [
      check("name", "Name is required").notEmpty(),
      check("category", "Category is required").notEmpty(),
      check("price", "Price is required").notEmpty(),
      check("stock", "Stock is required").notEmpty(),
      check("price", "Price must be a number").isFloat(),
      check("stock", "Stock must be a number").isFloat(),
    ],
    productController.updateProduct
  );
router.route("/deleteProduct/:name").get(productController.deleteProduct);

module.exports = router;
