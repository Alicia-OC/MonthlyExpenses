const UserSchema = require("../models/Users");
let User = UserSchema.User;

const yearlyExpensesCalculations = async (userId, card) => {
  console.log(card);
  try {
    const { totalExpenses, totalIncome, totalSavings, id, year } = card;
    const cardId = card._id;
   // const userId = user._id;

    const user = await User.findById(userId);

    const updatedCard = await User.findById(userId).populate({
      path: "cards",
      match: { _id: cardId },
    });

    if (!updatedCard || !user) {
      return res.status(404).json({ error: "Unauthorised" });
    } else {
      const index = user.dataByYear.findIndex((obj) => obj.year === year);
      const yearObj = user.dataByYear[index];
      //console.log(yearObj)
      console.log(user.dataByYear[index].totalExpenses);

      user.dataByYear[index].totalExpenses += card.totalExpensesDiff;
      user.dataByYear[index].totalSavings += card.totalSavingsDiff;
      user.dataByYear[index].totalIncome += card.totalIncomeDiff;

      console.log(user.dataByYear[index].totalExpenses);

      const updatedUser = await user.save();
    }
  } catch (error) {
    console.error(
      "Something went wrong while updating the dataByYear property:",
      error
    );
  }
};

module.exports = { yearlyExpensesCalculations };
