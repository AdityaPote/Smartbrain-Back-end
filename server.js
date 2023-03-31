const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
require("dotenv").config();

const signin = require("./controllers/signin");
const register = require("./controllers/register");
const image = require("./controllers/image");

const { connectDB } = require("./config/db");

const app = express();

app.use(bodyParser.json());
app.use(cors());

connectDB();

app.get("/api/", (req, res) => {
  res.send("its working");
});

app.post("/api/signin", (req, res) => {
  signin.handleSignin(req, res, bcrypt);
});

app.post("/api/register", (req, res) => {
  register.handleRegister(req, res, bcrypt);
});

app.put("/api/image", (req, res) => {
  image.handleImage(req, res);
});

app.post("/api/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
