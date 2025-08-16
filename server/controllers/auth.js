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
      cards: ["6893b3e92355a32a9159a9a4"],
    };

    const newUser = await User.create(userObj);
    console.log(newUser);
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
      expiresIn: "24h",
    });

    console.log(token);

    try {
      const currentYear = new Date().getFullYear();
      const currentmonth = new Date().getMonth();

      const lastLoginYear = user.lastLogin.getFullYear();
      const lastLoginMonth = user.lastLogin.getMonth();

      if (currentYear === lastLoginYear && currentmonth === lastLoginMonth) {
        const card = await User.findById(user.id).populate({
          path: "cards",
          select: "month year userid ",
          match: { month: currentmonth, year: currentYear, userid: user.id },
        });

        if (card) {
          console.log(card);
        }
        console.log(lastLoginYear);
      }
    } catch (error) {
    } finally {
      user.lastLogin = new Date();
    }

    const verifyLastLogin = () => {
      const currentYear = new Date().getFullYear();
      const currentmonth = new Date().getMonth();

      const lastLoginYear = user.lastLogin.getFullYear();
      const lastLoginMonth = user.lastLogin.getMonth();

      if (currentYear === lastLoginYear && currentmonth === lastLoginMonth)
        console.log(lastLoginYear);
    };

    const userWithoutPassword = user.toJSON();
    delete userWithoutPassword.password;
    res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { signIn, signUp };
