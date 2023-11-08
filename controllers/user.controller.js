const userModels = require("../models/user.models");
const bcrypt = require("bcryptjs");

exports.homepage = async (req, res, next) => {
  res.status(201).json({ message: "Homepage!" });
};

// user regiser
exports.userRegister = async (req, res, next) => {
  try {
    const { password, ...userData } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new userModels({ ...userData, password: hashPassword });
    await newUser.save();
    res.status(201).json({ message: "User created", newUser });
  } catch (error) {
    res.status(500).json({ messgae: `User not create ${error.message}` });
  }
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
      return res.status(201).json({ message: "User Logged In Successfully!" });
    } else {
      return res.status(401).json({ message: "Incorrect Password!" });
    }
  } catch (error) {
    res.status(500).json({ message: `Login failed: ${error.message}` });
  }
};


// user logout
exports.userLogout = async(req,res,next)=>{
    try {
        
    } catch (error) {
        
    }
}