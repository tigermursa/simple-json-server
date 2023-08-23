const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve the data.json file as a JSON response
app.get("/data", (req, res) => {
  res.sendFile(__dirname + "/data.json");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
