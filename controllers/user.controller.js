const userModels = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
exports.homepage = async (req, res, next) => {
  res.status(201).json({ message: "Homepage!" });
};

exports.userAll = async(req,res,next)=>{
  const userGet = await userModels.find();
  res.json(userGet)
}

// user regiser
exports.userRegister = async (req, res, next) => {
  try {
    const { password, ...userData } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new userModels({ ...userData, password: hashPassword });
    const token = jwt.sign(
      {
        userId: newUser._id,
        email: newUser.email,
      },
      process.env.SECRET_KEY
    );

    await newUser.save();
    res.cookie("authToken", token, {
      httpOnly: true,
      expiresIn: process.env.EXPIRES_IN,
    });
    res.status(201).json({ message: "User created", newUser });
  } catch (error) {}
};

// user login
exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User Not Found!" });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (isPassword) {
      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
        },
        process.env.SECRET_KEY
      );
      res.cookie("authToken", token, {
        httpOnly: true,
        expiresIn: process.env.EXPIRES_IN,
      });
      return res.status(201).json({ message: "User Logged In Successfully!" });
    } else {
      return res.status(401).json({ message: "Incorrect Password!" });
    }
  } catch (error) {
    res.status(500).json({ message: `Login failed: ${error.message}` });
  }
};

// user logout
exports.userLogout = async (req, res, next) => {
  try {
  } catch (error) {}
};
