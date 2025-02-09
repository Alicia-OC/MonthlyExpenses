const UserSchema = require("../models/Users");
const MonthCardSchema = require("../models/MonthCard");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let User = UserSchema.User;
let MonthCard = MonthCardSchema.MonthCard;


const newUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

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
      avatar: avatar,
    };

    const newUser = await User.create(userObj);

    if (newUser) {
      res.status(200).json({ message: "User created succesfully" });
    } else {
      console.log("There has been an error, please try again");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const updateDetails = asyncHandler(async (req, res) => {
    try {
    const { userId, name, email, password, avatar } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }

    if (avatar) {
      user.avatar = avatar;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    await user.save();

    res
      .status(200)
      .json({ message: "User details updated successfully", user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const updateCards = asyncHandler(async (req, res) => {
  try {
    const { userId, cardId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const card = await MonthCard.findById(cardId);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    user.cards.push(cardId);
    await user.save();
    res.status(200).json({ message: "New card added successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server errorA" });
  }
});

module.exports = { newUser, updateDetails, updateCards };
