const { cardCalculations } = require("./cardCalculations");

const createNewCard = async (user) => {
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
};


module.exports = { createNewCard };
