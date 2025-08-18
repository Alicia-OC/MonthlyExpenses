const UserSchema = require("../models/Users");
const MonthCardSchema = require("../models/MonthCard");

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let User = UserSchema.User;
let MonthCard = MonthCardSchema.MonthCard;

const { cardCalculations } = require("../utils/cardCalculations");
const { newCard } = require("./monthCardControllers");

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
      const currentmonth = new Date().getMonth() + 1;

      const lastLoginYear = user.lastLogin.getFullYear();
      const lastLoginMonth = user.lastLogin.getMonth() + 1;

      if (currentYear === lastLoginYear && currentmonth === lastLoginMonth) {
        const existingCard = await MonthCard.findOne({
          user: user.id,
          month: currentmonth,
          year: currentYear,
        });

        if (existingCard) {
          console.log(
            `This user already has a card for the current month: ${existingCard._id}`
          );
        } else {
          console.log("No card found for this month/year");

          const defaultUserItems = await cardCalculations(user);
          const cardObject = {
            user: user.id,
            year: currentYear,
            month: currentmonth,
            totalExpenses: defaultUserItems.totalExpenses,
            totalIncome: defaultUserItems.totalIncome,
            totalSavings: defaultUserItems.totalSavings,

            fixedItems: defaultUserItems.fixedItems,
            subscriptionItems: defaultUserItems.subscriptionItems,
            otherItems: defaultUserItems.otherItems,
            transportItems: defaultUserItems.transportItems,
            foodItems: defaultUserItems.foodItems,

            fixedExpenses: defaultUserItems.fixedExpenses,
            subscriptionExpenses: defaultUserItems.subscriptionExpenses,
            otherExpenses: defaultUserItems.otherExpenses,
            transportExpenses: defaultUserItems.transportExpenses,
          };
          const newCard = await MonthCard.create(cardObject);
          if (newCard) {
            user.cards.push(newCard._id);

            const expensesYearIndex = user.dataByYear.findIndex(
              (obj) => obj.year === newCard.year
            );

            if (expensesYearIndex === -1) {
              user.dataByYear.push({
                year: newCard.year,
                totalSavings: newCard.totalSavings,
                totalExpenses: newCard.totalExpenses,
                totalIncome: newCard.totalIncome,
              });
            } else {
              user.dataByYear[expensesYearIndex].savings +=
                newCard.totalSavings;
              user.dataByYear[expensesYearIndex].expenses +=
                newCard.totalExpenses;
              user.dataByYear[expensesYearIndex].income += newCard.totalIncome;
            }
            await user.save();
          }
          console.log(newCard);
        }
      }
    } catch (error) {
      console.error("Error", error);
      res.status(500).json({ error: error.message });
    }

    const userWithoutPassword = user.toJSON();
    delete userWithoutPassword.password;
    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
  }
});

module.exports = { signIn, signUp };
