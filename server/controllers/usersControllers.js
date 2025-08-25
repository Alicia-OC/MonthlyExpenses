const UserSchema = require("../models/Users");
const MonthCardSchema = require("../models/MonthCard");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
let User = UserSchema.User;
let MonthCard = MonthCardSchema.MonthCard;

const updateDetails = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      avatar,
      totalIncome,
      fixedItems,
      subscriptionItems,
      otherItems,
      transportItems,
      foodItems,
      currency,
    } = req.body;

    const { userid } = req.params;
    console.log(userid, name, email);

    const user = await User.findById(userid);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user profile fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (avatar) user.avatar = avatar;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    // Update default items fields
    if (totalIncome !== undefined) user.defaultItems.totalIncome = totalIncome;
    if (fixedItems) user.defaultItems.fixedItems.items = fixedItems;
    if (subscriptionItems)
      user.defaultItems.subscriptionItems.items = subscriptionItems;
    if (otherItems) user.defaultItems.otherItems.items = otherItems;
    if (transportItems) user.defaultItems.transportItems.items = transportItems;
    if (foodItems) user.defaultItems.foodItems.items = foodItems;
    if (currency) user.currency = currency;

    await user.save();

    const userDataUpdated = {
      defaultItems: user.defaultItems,
      currency: user.currency,
      cards: user.cards,
      name: user.name,
      email: user.email,
    };

    res.status(200).json({
      message: "User details updated successfully",
      userDataUpdated,
    });
  } catch (error) {
    console.error("Update error:", error);
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

//returns all the cards documments, works bt it's not implemented for now
const getAllCardItemsByUser = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(404).json({ error: "userId is required" });
    }

    //find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      const cards = await Promise.all(
        user.cards.map((item) => MonthCard.findById(item.toString()))
      );

      res.status(200).json(cards);
    }
  } catch (error) {
    console.error("Error getting all cards:", error);
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

const getAllCardsByUser = asyncHandler(async (req, res) => {
  try {
    const { userid } = req.body;

    if (!userid) {
      return res.status(404).json({ error: "userId is required" });
    }

    //find user
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const allCards = await Promise.all(
        user.cards.map((item) => MonthCard.findById(item.toString()).lean())
      );

      const filteredCards = allCards.filter((card) => card !== null);

      const cardData = filteredCards.map((card) => {
        const item = {
          cardId: card._id.toString(),
          month: months[card.month + 1].toString(),
        };
        return item;
      });

      res.status(200).json(cardData);
    }
  } catch (error) {
    console.error("Error getting all cards:", error);
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

const getUserDefaultItems = asyncHandler(async (req, res) => {
  try {
    const { userid } = req.params;
    const user = await User.findById(userid);
    if (!userid || !user) {
      return res.status(404).json({ error: "access denied" });
    }

    const defaultItems = user.defaultItems;

    res.status(200).json(defaultItems);
  } catch (error) {
    console.error("Error in the user's default items:", error);
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

module.exports = {
  updateDetails,
  updateCards,
  getAllCardsByUser,
  getUserDefaultItems,
};
