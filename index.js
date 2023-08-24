const express = require("express");
const cors = require("cors"); // Import the cors package
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const productsData = require("./data.json"); // Import your data.json
const jwt = require("jsonwebtoken");
// JWT verify middleware code here ..................................
const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "Unauthorized access" });
  }
  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: true, message: "Unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};
// Use the cors middleware
app.use(cors());

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
  // jwt api
  app.post("/jwt", (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "3h",
    });
    res.send({ token });
  });
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
