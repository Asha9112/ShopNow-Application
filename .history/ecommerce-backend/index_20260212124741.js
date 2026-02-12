const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let products = [];

app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

// Add product
app.post("/api/products", (req, res) => {
  const product = {
    id: Date.now(),
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
  };

  products.push(product);
  res.json(product);
});

// Get products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Delete product
app.delete("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  products = products.filter((p) => p.id !== id);
  res.json({ message: "Product deleted" });
});

// Update product
app.put("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);

  products = products.map((p) =>
    p.id === id ? { ...p, ...req.body } : p
  );

  res.json({ message: "Product updated" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
