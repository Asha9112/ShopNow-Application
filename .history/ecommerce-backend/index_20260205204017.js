
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

// Temporary product storage (later DB)
let products = [];

// ADMIN: Add product
app.post("/api/products", (req, res) => {
  const product = req.body;
  product.id = Date.now();
  products.push(product);
  res.json({ message: "Product added", product });
});

// USER: Get products
app.get("/api/products", (req, res) => {
  res.json(products);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
