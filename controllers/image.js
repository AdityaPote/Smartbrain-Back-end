const Clarifai = require("clarifai");
const User = require("../models/UserModel");

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: process.env.API_CLARIFAI,
});

const handleApiCall = (req, res) => {
  app.models
    .predict(
      {
        id: "a403429f2ddf4b49b307e318f00e528b",
        version: "34ce21a40cc24b6b96ffee54aabff139",
      },
      req.body.input
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with API"));
};

const handleImage = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);
    if (user) {
      user.entries++;
      user.save();
      return res.json(user.entries);
    } else {
      throw new Error("user not found");
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  handleImage,
  handleApiCall,
};
