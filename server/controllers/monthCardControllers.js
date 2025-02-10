const MonthCardSchema = require("../models/MonthCard");
const UserSchema = require("../models/Users");

const asyncHandler = require("express-async-handler");
let User = UserSchema.User;
let MonthCard = MonthCardSchema.MonthCard;

//create a new Month Card
const newCard = asyncHandler(async (req, res) => {
  try {
    const {
      userId,
      year,
      month,
      totalExpenses,
      totalIncome,
      totalSavings,
      fixedItems,
      subscriptionItems,
      otherItems,
      transportItems,

      fixedExpenses,
      subscriptionExpenses,
      otherExpenses,
      transportExpenses,
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.year === year && user.month === month) {
      return res
        .status(404)
        .json({ message: "You already have a card for this month" });
    }

    const cardObject = {
      user: userId,
      year: year,
      month: month,
      totalExpenses: totalExpenses,
      totalIncome: totalIncome,
      totalSavings: totalSavings,
      fixedItems: fixedItems,
      subscriptionItems: subscriptionItems,
      otherItems: otherItems,
      transportItems: transportItems,
    };

    const newCard = await MonthCard.create(cardObject);

    if (newCard) {
      res.status(200).json({ message: "Month card created succesfully" });
    } else {
      console.log("There has been an error, please try again");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getCard = asyncHandler(async (req, res) => {
  try {
    const { userId, cardId } = req.body;

    if (!userId || !cardId) {
      return res.status(404).json({ error: "userId and cardId are required" });
    }

    const card = await MonthCard.findById(cardId);

    if (card.user.toString() === userId) {
      res.status(200).json(card);
    } else {
      res.status(400).json({ error: "access denied" });
    }
  } catch (error) {
    console.error("Error in getCard:", error);
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

//add, delete or update items
const updateCard = asyncHandler(async (req, res) => {
  try {
    const {
      userId,
      cardId,
      year,
      month,
      totalExpenses,
      totalIncome,
      totalSavings,
      fixedItems,
      subscriptionItems,
      otherItems,
      transportItems,

      fixedExpenses,
      subscriptionExpenses,
      otherExpenses,
      transportExpenses,
    } = req.body;

    if (!userId || !cardId) {
      return res.status(404).json({ error: "userId and cardId are required" });
    }

    const user = await User.findById(userId);
    const card = await MonthCard.findById(cardId);

    if (
      !user ||
      !card ||
      !user.cards.includes(cardId) ||
      card.user.toString() !== userId
    ) {
      return res.status(400).json({ message: "User or template not found" });
    }

    // Update the fields
    if (year) card.year = year;
    if (month) card.month = month;

    // Replace arrays if new data is provided
    if (fixedItems) card.fixedItems = fixedItems;
    if (subscriptionItems) card.subscriptionItems = subscriptionItems;
    if (otherItems) card.otherItems = otherItems;
    if (transportItems) card.transportItems = transportItems;

    //calculations

    const calcFixedExpenses = () => {
      let sum = 0;
      for (let index = 0; index < fixedItems.length; index++) {
        sum += fixedItems[index].amount;
      }
      return sum;
    };

    const calcSubscriptionExpenses = () => {
      let sum = 0;
      for (let index = 0; index < subscriptionItems.length; index++) {
        sum += subscriptionItems[index].amount;
      }
      return sum;
    };

    const calcOtherExpenses = () => {
      let sum = 0;
      for (let index = 0; index < otherItems.length; index++) {
        sum += otherItems[index].amount;
      }
      return sum;
    };

    const calcTransportExpenses = () => {
      let sum = 0;
      for (let index = 0; index < transportItems.length; index++) {
        sum += transportItems[index].amount;
      }
      return sum;
    };

    card.fixedExpenses = calcFixedExpenses();
    card.subscriptionExpenses = calcSubscriptionExpenses();
    card.otherExpenses = calcOtherExpenses();
    card.transportExpenses = calcTransportExpenses();

    const calcTotalExpenses = () => {
      return (
        calcFixedExpenses() +
        calcSubscriptionExpenses() +
        calcOtherExpenses() +
        calcTransportExpenses()
      );
    };
    card.totalExpenses = calcTotalExpenses();

    const calcTotalSavings = () => {
      return totalIncome - calcTotalExpenses();
    };

    card.totalSavings = calcTotalSavings();


    const updatedCard = await card.save();
    return res.status(200).json(updatedCard);
  } catch (error) {
    console.error("Error in updateCard:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
});

//return the default items stored by the user
const setUpInitialCard = asyncHandler(async (req, res) => {});

module.exports = { newCard, updateCard, getCard };
