const mongoose = require("mongoose");

const monthSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    totalExpenses: { type: Number, required: true },
    totalIncome: { type: Number, required: true },
    totalSavings: { type: Number, required: true },
    fixedExpenses: [
      {
        description: String,
        amount: Number,
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category", // Reference to the Category model
          required: true,
        },
        date: Date,
      },
    ],
    subscriptionExpenses: [
      {
        description: String,
        amount: Number,
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category", // Reference to the Category model
          required: true,
        },
        date: Date,
      },
    ],
    otherExpenses: [
      {
        description: String,
        amount: Number,
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category", // Reference to the Category model
          required: true,
        },
        date: Date,
      },
    ],
    transportExpenses: [
      {
        description: String,
        amount: Number,
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category", // Reference to the Category model
          required: true,
        },
        date: Date,
      },
    ],
  },
);

const Month = mongoose.model("Month", monthSchema);

module.exports = Month;
