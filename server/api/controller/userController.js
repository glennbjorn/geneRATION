const User = require("../model/User");

// Create registerNewUser method
exports.registerNewUser = async (req, res) => {
  try {
    let users_with_same_email = await User.find({ email: req.body.email });
    if (users_with_same_email.length >= 1) {
      return res.status(409).json({
        message: "email already in use",
      });
    }
    const user = new User({
      name: req.body.name,
      organisation: req.body.organisation,
      email: req.body.email,
      password: req.body.password,
    });
    let data = await user.save();
    const token = await user.generateAuthToken(); // here it is calling the method that we created in the model
    res.status(201).json({ data, token });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .json({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

exports.getUserDetails = async (req, res) => {
  await res.json(req.userData);
};

exports.getUserOrg = async (req, res) => {
  try {
    let user = await User.find({ email: req.body.email });
    await res.json(user[0].organisation);
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

exports.findUser = async (req, res) => {
  try {
    let exist = await User.find({ email: req.body.email });
    console.log(req.body)
    if (exist.length >= 1) {
      res.status(201).json();
    } else {
      res.status(202).json({
        message: "email does not exist",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "error" });
  }
};
