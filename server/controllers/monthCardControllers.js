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
      foodItems
    } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingCard = await MonthCard.findOne({ user: userId, year, month });
    if (existingCard) {
      return res
        .status(404)
        .json({ message: "You already have a card for this month" });
    }

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

    const calcFoodExpenses = () => {
      let sum = 0;
      for (let index = 0; index < transportItems.length; index++) {
        sum += transportItems[index].amount;
      }
      return sum;
    };

    const calcTotalExpenses = () => {
      const result =
        calcFixedExpenses() +
        calcSubscriptionExpenses() +
        calcOtherExpenses() +
        calcTransportExpenses() + calcFoodExpenses();
      return result;
    };

    const calcTotalSavings = () => {
      return totalIncome - calcTotalExpenses();
    };

    const cardObject = {
      user: userId,
      year: year,
      month: month,
      totalExpenses: calcTotalExpenses(),
      totalIncome: totalIncome,
      totalSavings: calcTotalSavings(),

      fixedItems: fixedItems,
      subscriptionItems: subscriptionItems,
      otherItems: otherItems,
      transportItems: transportItems,
      foodItems: foodItems,

      fixedExpenses: calcFixedExpenses(),
      subscriptionExpenses: calcSubscriptionExpenses(),
      otherExpenses: calcOtherExpenses(),
      transportExpenses: calcTransportExpenses(),
      foodExpenses: calcFoodExpenses()
    };

    const newCard = await MonthCard.create(cardObject);

    if (newCard) {
      user.cards.push(newCard._id);
      await user.save();

      res.status(200).json({ message: "Month card created succesfully with id " + newCard._id });
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
      foodItems,

      fixedExpenses,
      subscriptionExpenses,
      otherExpenses,
      transportExpenses,
      foodExpenses
    } = req.body;

    if (!userId || !cardId) {
      return res.status(404).json({ error: "userId and cardId are required" });
    }

    const user = await User.findById(userId);
    const card = await MonthCard.findById(cardId);

    if (
      !user ||
      !card ||
      //!user.cards.includes(cardId) ||
      card.user.toString() !== userId
    ) {
      return res.status(400).json({ message: "User or card not found" });
    }

    //calculations

    const calcFixedExpenses = () => {
      let items = card.fixedItems;
      let sum = 0;
      for (let index = 0; index < items.length; index++) {
        sum += items[index].amount;
      }
      return sum;
    };

    const calcSubscriptionExpenses = () => {
      let items = card.subscriptionItems;
      let sum = 0;
      for (let index = 0; index < items.length; index++) {
        sum += items[index].amount;
      }
      return sum;
    };

    const calcOtherExpenses = () => {
      let items = card.otherItems;

      let sum = 0;

      for (let index = 0; index < items.length; index++) {
        sum += items[index].amount;
      }
      return sum;
    };

    const calcTransportExpenses = () => {
      let items = card.transportItems;

      let sum = 0;
      for (let index = 0; index < items.length; index++) {
        sum += items[index].amount;
      }
      return sum;
    };


    const calcFoodExpenses = () => {
      let items = card.foodItems;

      let sum = 0;
      for (let index = 0; index < items.length; index++) {
        sum += items[index].amount;
      }
      return sum;
    };

    // Update the fields
    if (year) card.year = year;
    if (month) card.month = month;

    // Replace arrays if new data is provided & recalculate expenses
    if (fixedItems) {
      card.fixedItems = fixedItems;
      card.fixedExpenses = calcFixedExpenses();
    }
    if (subscriptionItems) {
      card.subscriptionItems = subscriptionItems;
      card.subscriptionExpenses = calcSubscriptionExpenses();
    }
    if (otherItems) {
      card.otherItems = otherItems;
      card.otherExpenses = calcOtherExpenses();
    }
    if (transportItems) {
      card.transportItems = transportItems;
      card.transportExpenses = calcTransportExpenses();
    }
  if (foodItems) {
      card.foodItems = foodItems;
      card.foodExpenses = calcFoodExpenses();
    }

    const calcTotalExpenses = () => {
      const result =
        calcFixedExpenses() +
        calcSubscriptionExpenses() +
        calcOtherExpenses() +
        calcTransportExpenses() + calcFoodExpenses();
      return result;
    };

    card.totalExpenses = calcTotalExpenses();

    const calcTotalSavings = () => {
      return card.totalIncome - calcTotalExpenses();
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
const setUpInitialCard = asyncHandler(async (req, res) => { });

module.exports = { newCard, updateCard, getCard };
