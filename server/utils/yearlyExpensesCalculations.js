const UserSchema = require("../models/Users");
let User = UserSchema.User;

const yearlyExpensesCalculations = async (userId, card) => {
  console.log(card);
  try {
    const { totalExpensesDiff, totalIncomeDiff, totalSavingsDiff, id, year } =
      card;
    const cardId = card._id;

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

      user.dataByYear[index].totalExpenses += totalExpensesDiff;
      user.dataByYear[index].totalSavings += totalSavingsDiff;
      user.dataByYear[index].totalIncome += totalIncomeDiff;

      const updatedUser = await user.save();

      return updatedUser
    }
  } catch (error) {
    console.error(
      "Something went wrong while updating the dataByYear property:",
      error
    );
  }
};

module.exports = { yearlyExpensesCalculations };
