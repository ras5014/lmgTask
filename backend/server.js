const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const dbConnection = require("./dbconfig");
const routes = require("./routes");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

const PORT = process.env.PORT || 5000;
const server = () => {
  dbConnection();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

server();

module.exports = app;
