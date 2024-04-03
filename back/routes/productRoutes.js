const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { adminCheck } = require("../middlewares/adminCheck");

// Create a new product
router.post("/", adminCheck, productController.createProduct);

// Get all products
router.get("/", productController.getAllProducts);

// Get a single product by ID
router.get("/:id", productController.getProductById);

// Update a product by ID
router.put("/:id", productController.updateProductById);

// Delete a product by ID
router.delete("/:id", productController.deleteProductById);

module.exports = router;
