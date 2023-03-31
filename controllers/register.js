const Login = require("../models/LoginModel");
const User = require("../models/UserModel");

const handleRegister = async (req, res, bcrypt) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      throw new Error("Enter all fields");
    }
    if (await User.findOne({ email })) {
      throw new Error("Email already exists");
    }
    const hash = bcrypt.hashSync(password);
    await Login.create({
      name,
      hash,
      email,
    });
    const newUser = await User.create({
      name,
      hash,
      email,
      entries: 0,
      joined: new Date(),
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  handleRegister,
};
