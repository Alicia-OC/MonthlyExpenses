const UserSchema = require("../models/Users");
let User = UserSchema.User;

const yearlyExpensesCalculations = async (user, card) => {
  console.log(card);
  try {
    const { totalExpenses, totalIncome, totalSavings, id, year } = card;
    const cardId = card._id;
    const userId = user._id;

    const updatedCard = await User.findById(userId).populate({
      path: "cards",
      match: { _id: cardId },
    });

    if (!updatedCard) {
      return res.status(404).json({ error: "Unauthorised" });
    } else {
      const index = user.dataByYear.findIndex((obj) => obj.year === year);
      const yearObj = user.dataByYear[index];
      console.log(user.dataByYear[index]);
      user.dataByYear;
    }
  } catch (error) {
    console.error(
      "Something went wrong while updating the dataByYear property:",
      error
    );
  }
};

module.exports = { yearlyExpensesCalculations };
