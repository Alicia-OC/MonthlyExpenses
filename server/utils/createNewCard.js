const MonthCardSchema = require("../models/MonthCard");

const { cardCalculations } = require("./cardCalculations");

let MonthCard = MonthCardSchema.MonthCard;

const createNewCard = async (user) => {
  const defaultUserItems = await cardCalculations(user);
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const cardObject = {
    user: user._id,
    year: currentYear,
    month: currentMonth,
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
  const existingCard = await MonthCard.findOne({ user: user._id, currentYear, currentMonth});

  if (existingCard) {
    console.log('existing card')
    return res
      .status(404)
      .json({ message: "You already have a card for this month" });
  }
  const newCard = await MonthCard.create(cardObject);

  if (newCard) {
    user.cards.push(newCard._id);
    await user.save();
  }

  return newCard;
};

module.exports = { createNewCard };
