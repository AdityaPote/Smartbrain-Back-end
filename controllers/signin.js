const User = require("../models/UserModel");

const handleSignin = async (req, res, bcrypt) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Enter all fields");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email not found");
    }
    const isValid = bcrypt.compareSync(password, user.hash);
    if (!isValid) {
      throw new Error("Invalid password");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  handleSignin,
};
