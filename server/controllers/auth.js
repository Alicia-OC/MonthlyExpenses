const UserSchema = require("../models/Users");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let User = UserSchema.User;

const signUp = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const hashedPwd = await bcrypt.hash(password, 10); //10 salt rounds
    const duplicatedMail = await User.findOne({ email }).lean().exec();

    if (duplicatedMail) {
      return res.status(409).json({
        message:
          "This email is already in use, to reset your password please click the button down below",
      });
    }

    const userObj = {
      name: name,
      email: email,
      password: hashedPwd,
      cards: ["67b379cc31d54e6b6a38479d"],
    };

    const newUser = await User.create(userObj);

    if (newUser) {
      res.status(201).json({ message: "User created succesfully" });
    } else {
      console.log("There has been an error, please try again");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const signIn = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "User doesn't exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send({
        accessToken: null,
        msg: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "10h",
    });
    console.log(token);
    delete user.password; // make sure the frontend doesn't receive the pw back

    const userWithoutPassword = user.toJSON();
    delete userWithoutPassword.password;
    res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { signIn, signUp };
