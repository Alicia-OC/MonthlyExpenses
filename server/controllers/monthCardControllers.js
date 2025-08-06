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
      totalIncome,
      fixedItems,
      subscriptionItems,
      otherItems,
      transportItems,
      foodItems,
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

    const calcFixedExpenses = () =>
      fixedItems.items.reduce((sum, item) => sum + item.price, 0);

    const calcSubscriptionExpenses = () =>
      subscriptionItems.items.reduce((sum, item) => sum + item.price, 0);

    const calcOtherExpenses = () =>
      otherItems.items.reduce((sum, item) => sum + item.price, 0);

    const calcTransportExpenses = () =>
      transportItems.items.reduce((sum, item) => sum + item.price, 0);

    const calcFoodExpenses = () =>
      foodItems.items.reduce((sum, item) => sum + item.price, 0);

    const calcTotalExpenses = () => {
      const result =
        calcFixedExpenses() +
        calcSubscriptionExpenses() +
        calcOtherExpenses() +
        calcTransportExpenses() +
        calcFoodExpenses();
      return result;
    };

    const calcTotalSavings = () => {
      const total = totalIncome - calcTotalExpenses();
      return Number(total.toFixed(2));
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
      foodExpenses: calcFoodExpenses(),
    };

    const newCard = await MonthCard.create(cardObject);

    if (newCard) {
      user.cards.push(newCard._id);
      await user.save();

      res.status(200).json({
        message: "Month card created succesfully with id " + newCard._id,
      });
    } else {
      console.log("There has been an error, please try again");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getCard = asyncHandler(async (req, res) => {
  try {
    const { userid, cardid } = req.params;
    console.log("userid:", userid, "cardid:", cardid);

    if (!userid || !cardid) {
      return res.status(404).json({ error: "userId and cardid are required" });
    }

    const card = await MonthCard.findById(cardid);
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }
    console.log("Found card:", card);

    return res.status(200).json(card);
  } catch (error) {
    console.error("Error in getCard:", error);
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

const getLastFourCards = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id; // From JWT token

    const user = await User.findById(userId).populate({
      path: "cards",
      select:
        "month  foodExpenses subscriptionExpenses transportExpenses otherExpenses",
      options: { sort: { createdAt: -1 }, limit: 4 },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const result = user.cards.map((card) => ({
      id: card._id,
      month: card.month,
      foodExpenses: card.foodExpenses,
      subscriptionExpenses: card.subscriptionExpenses,
      transportExpenses: card.transportExpenses,
      otherExpenses: card.otherExpenses,
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Error getting the last 4 cards:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//add, delete or update items
const updateCard = asyncHandler(async (req, res) => {
  try {
    const {
      userId,
      cardid,
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
      foodExpenses,
    } = req.body;

    if (!userId || !cardid) {
      return res.status(404).json({ error: "userId and cardid are required" });
    }

    const user = await User.findById(userId);
    const card = await MonthCard.findById(cardid);

    if (
      !user ||
      !card ||
      //!user.cards.includes(cardid) ||
      card.user.toString() !== userId
    ) {
      return res.status(400).json({ message: "User or card not found" });
    }

    //calculations

    const calcFixedExpenses = () => {
      let items = card.fixedItems;
      let sum = 0;
      for (let index = 0; index < items.length; index++) {
        sum += items[index].price;
      }
      return sum;
    };

    const calcSubscriptionExpenses = () => {
      let items = card.subscriptionItems;
      let sum = 0;
      for (let index = 0; index < items.length; index++) {
        sum += items[index].price;
      }
      return sum;
    };

    const calcOtherExpenses = () => {
      let items = card.otherItems;

      let sum = 0;

      for (let index = 0; index < items.length; index++) {
        sum += items[index].price;
      }
      return sum;
    };

    const calcTransportExpenses = () => {
      let items = card.transportItems;

      let sum = 0;
      for (let index = 0; index < items.length; index++) {
        sum += items[index].price;
      }
      return sum;
    };

    const calcFoodExpenses = () => {
      let items = card.foodItems;

      let sum = 0;
      for (let index = 0; index < items.length; index++) {
        sum += items[index].price;
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
        calcTransportExpenses() +
        calcFoodExpenses();
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
const setUpInitialCard = asyncHandler(async (req, res) => {});

module.exports = { newCard, updateCard, getCard, getLastFourCards };
