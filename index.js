const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const productsData = require("./data.json"); // Import your data.json

app.get("/", (req, res) => {
  res.send("JSON server running");
});

app.get("/products", (req, res) => {
  res.json(productsData);
});

// Get product by ID
app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = productsData.find((item) => item.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
