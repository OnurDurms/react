const { User } = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Mongoose = require('mongoose');

dotenv.config();


const loginUser = async (email, password, res) => {
  try {

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    var user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      var token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      res.status(200).json({ user: user, token: token });
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
}

const registerUser = async (name, email, password,isAdmin, res) => {
  try {

    if (!(email && password && name && isAdmin)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      isAdmin: isAdmin
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
}


module.exports = {
  registerUser,
  loginUser,
}