const Clarifai = require("clarifai");
const User = require("../models/UserModel");

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: "a44beaf20a154527b2037ef68b4ccc3f",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
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
