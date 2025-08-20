const MonthCardSchema = require("../models/MonthCard");
const UserSchema = require("../models/Users");
const { cardCalculations } = require("../utils/cardCalculations");
const {
  yearlyExpensesCalculations,
} = require("../utils/yearlyExpensesCalculations");

const asyncHandler = require("express-async-handler");
let User = UserSchema.User;
let MonthCard = MonthCardSchema.MonthCard;

/**DEV card creation */
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

const newAutomaticCard = asyncHandler(async (req, res) => {
  try {
    const { year, month } = req.body;
    const { userid } = req.params;

    const user = await User.findById(userid);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingCard = await MonthCard.findOne({ user: userid, year, month });

    if (existingCard) {
      return res
        .status(404)
        .json({ message: "You already have a card for this month" });
    }

    const defaultUserItems = await cardCalculations(user);

    const cardObject = {
      user: userid,
      year: year,
      month: month,
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

    /**UPDATE  USER'S CARD ARRAY */
    if (newCard) {
      user.cards.push(newCard._id);

      const dataBlockIndex = user.dataByYear.findIndex(
        (obj) => obj.year === year
      );

      if (dataBlockIndex === -1) {
        user.dataByYear.push({
          year: newCard.year,
          savings: newCard.totalSavings,
          expenses: newCard.totalExpenses,
          income: newCard.totalIncome,
        });
      } else {
        user.dataByYear[dataBlockIndex].savings += newCard.totalSavings;
        user.dataByYear[dataBlockIndex].expenses += newCard.totalExpenses;
        user.dataByYear[dataBlockIndex].income += newCard.totalIncome;
      }

      await user.save();

      res.status(200).json({
        message: "Month card created succesfully with id " + newCard._id,
      });
    } else {
      console.log("There has been an error, please try again");
    }
  } catch (error) {
    console.error("Error in newAutomaticCard:", error);
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

const getLastCard = asyncHandler(async (req, res) => {
  try {
    const { userid } = req.params;

    //replace the cards field with the full card documents from that referenced collection.
    const user = await User.findById(userid).populate("cards");

    if (!userid || !user) {
      return res.status(404).json({ error: "access denied" });
    }

    if (user.cards.length === 0) {
      console.log("No cards found for this user.");
    } else {
      const latestCard = user.cards[user.cards.length - 1];
      return res.status(200).json(latestCard);
    }
  } catch (error) {
    console.error("Error:", error);
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
        "month foodExpenses subscriptionExpenses transportExpenses otherExpenses",
      options: { sort: { createdAt: -1 }, limit: 4 },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const result = user.cards.map((card) => ({
      id: card._id,
      month: card.month,
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Error getting the last 4 cards:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const getAllCards = asyncHandler(async (req, res) => {
  try {
    const { userid } = req.params;

    const user = await User.findById(userid).populate({
      path: "cards",
      select:
        "id month year currency foodExpenses subscriptionExpenses transportExpenses otherExpenses",
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const result = user.cards.map((card) => ({
      id: card._id,
      month: card.month,
      year: card.year,
      foodExpenses: card.foodExpenses,
      subscriptionExpenses: card.subscriptionExpenses,
      transportExpenses: card.transportExpenses,
      otherExpenses: card.otherExpenses,
      currency: card.currency,
    }));

    const groupCards = (cards) => {
      const grouped = {};

      cards.forEach((card) => {
        const year = card.year;
        if (!grouped[year]) {
          grouped[year] = [];
        }
        grouped[year].push(card);
      });

      Object.keys(grouped).forEach((year) => {
        grouped[year].sort((a, b) => a.month - b.month);
      });

      return grouped;
    };
    const groupedData = groupCards(result);

    res.status(200).json({
      cards: result, // Original flat array
      groupCards: groupedData, // Grouped by year
    });
  } catch (error) {
    console.error("Error getting the cards:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//add, delete or update items
const updateCard = asyncHandler(async (req, res) => {
  try {
    const {
      year,
      month,
      fixedItems,
      subscriptionItems,
      otherItems,
      transportItems,
      foodItems,
    } = req.body;

    const { userid, cardid } = req.params;

    if (!cardid) {
      console.log({ error: "userId and cardid are required" });
      return res.status(404).json({ error: "userId and cardid are required" });
    }
    const user = await User.findById(userid);
    const card = await MonthCard.findById(cardid);

    if (!user || !card || card.user.toString() !== userid) {
      return res.status(400).json({ message: "User or card not found" });
    }

    //calculations

    const calcFixedExpenses = () => {
      if (!fixedItems || !Array.isArray(fixedItems)) {
        return 0;
      }
      return fixedItems.reduce((sum, item) => sum + (item.price || 0), 0);
    };

    const calcSubscriptionExpenses = () => {
      if (!subscriptionItems || !Array.isArray(subscriptionItems)) {
        return 0;
      }
      return subscriptionItems.reduce(
        (sum, item) => sum + (item.price || 0),
        0
      );
    };

    const calcOtherExpenses = () => {
      if (!otherItems || !Array.isArray(otherItems)) {
        return 0;
      }
      return otherItems.reduce((sum, item) => sum + (item.price || 0), 0);
    };

    const calcTransportExpenses = () => {
      if (!transportItems || !Array.isArray(transportItems)) {
        return 0;
      }
      return transportItems.reduce((sum, item) => sum + (item.price || 0), 0);
    };

    const calcFoodExpenses = () => {
      if (!foodItems || !Array.isArray(foodItems)) {
        return 0;
      }
      return foodItems.reduce((sum, item) => sum + (item.price || 0), 0);
    };

    // Update the fields
    if (year) card.year = year;
    if (month) card.month = month;

    // Replace arrays if new data is provided & recalculate expenses

    if (fixedItems) {
      card.fixedItems.items = fixedItems;
      card.fixedExpenses = calcFixedExpenses();
    }

    if (subscriptionItems) {
      card.subscriptionItems.items = subscriptionItems;
      card.subscriptionExpenses = calcSubscriptionExpenses();
    }
    if (otherItems) {
      card.otherItems.items = otherItems;
      card.otherExpenses = calcOtherExpenses();
    }
    if (transportItems) {
      card.transportItems.items = transportItems;
      card.transportExpenses = calcTransportExpenses();
    }
    if (foodItems) {
      card.foodItems.items = foodItems;
      card.foodExpenses = calcFoodExpenses();
    }

    const calcTotalExpenses = () => {
      const result =
        calcFixedExpenses() +
        calcSubscriptionExpenses() +
        calcOtherExpenses() +
        calcTransportExpenses() +
        calcFoodExpenses();
      return Number(result.toFixed(2));
    };

    card.totalExpenses = calcTotalExpenses();

    const calcTotalSavings = () => {
      const total = card.totalIncome - calcTotalExpenses();
      return Number(total.toFixed(2));
    };

    card.totalSavings = calcTotalSavings();
    const updatedCard = await card.save();

    /**UPDATE DATABYYEAR   */

    const { totalExpenses, totalIncome, totalSavings, id } = card;

    const mockCard = {
      totalExpenses: updatedCard.totalExpenses,
      totalIncome: updatedCard.totalIncome,
      totalSavings: updatedCard.totalSavings,
      id: updatedCard._id,
      year: updatedCard.year,
    };

    const updatedDataByYear = await yearlyExpensesCalculations(
      user,
      mockCard
    );

    return res.status(200).json(updatedCard);
  } catch (error) {
    console.error("Error in updateCard:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
});

module.exports = {
  newCard,
  updateCard,
  getCard,
  getLastCard,
  getAllCards,
  getLastFourCards,
  newAutomaticCard,
};
