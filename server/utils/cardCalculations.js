const cardCalculations = async (user) => {
  const fixedItems = user.defaultItems?.fixedItems.items || [];
  const subscriptionItems = user.defaultItems?.subscriptionItems.items || [];
  const otherItems = user.defaultItems?.otherItems.items || [];
  const transportItems = user.defaultItems?.transportItems.items || [];
  const foodItems = user.defaultItems?.foodItems.items || [];
  const totalIncome = user.defaultItems?.totalIncome || 0;

  const objectData = {
    fixedItems: fixedItems,
    subscriptionItems: subscriptionItems,
    otherItems: otherItems,
    transportItems: transportItems,
    foodItems: foodItems,
    totalIncome: totalIncome,
  };

  const calcFixedExpenses = () =>
    objectData.fixedItems.reduce((sum, item) => sum + (item.price || 0), 0);

  const calcSubscriptionExpenses = () =>
    objectData.subscriptionItems.reduce(
      (sum, item) => sum + (item.price || 0),
      0
    );

  const calcOtherExpenses = () =>
    objectData.otherItems.reduce((sum, item) => sum + (item.price || 0), 0);

  const calcTransportExpenses = () =>
    objectData.transportItems.reduce((sum, item) => sum + (item.price || 0), 0);

  const calcFoodExpenses = () =>
    objectData.foodItems.reduce((sum, item) => sum + (item.price || 0), 0);

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
    const total = objectData.totalIncome - calcTotalExpenses();
    return Number(total.toFixed(2));
  };

  // Debug logs

  const data = {
    fixedItems: { items: fixedItems },
    subscriptionItems: { items: subscriptionItems },
    otherItems: { items: otherItems },
    transportItems: { items: transportItems },
    foodItems: { items: foodItems },

    totalExpenses: calcTotalExpenses(),
    totalSavings: calcTotalSavings(),
    totalIncome: totalIncome,
    fixedExpenses: calcFixedExpenses(),
    subscriptionExpenses: calcSubscriptionExpenses(),
    otherExpenses: calcOtherExpenses(),
    transportExpenses: calcTransportExpenses(),
    foodExpenses: calcFoodExpenses(),
  };

  return data;
};

const createMonthCard = async (userid, year, month, defaultItems) => {};

module.exports = { cardCalculations, createMonthCard };
