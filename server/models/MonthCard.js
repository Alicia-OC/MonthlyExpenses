const mongoose = require("mongoose");

const monthCardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  totalExpenses: { type: Number, required: true, default: 0 },
  totalIncome: { type: Number, required: true, default: 0 },
  totalSavings: { type: Number, required: true, default: 0 },
  fixedItems: [
    {
      description: String,
      amount: Number,
      date: Date,
    },
  ],
  fixedExpenses: { type: Number, required: true, default: 0 },
  subscriptionItems: [
    {
      description: String,
      amount: Number,
      date: Date,
    },
  ],
  subscriptionExpenses: { type: Number, required: true, default: 0 },
  otherItems: [
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
  otherExpenses: { type: Number, required: true, default: 0 },

  transportItems: [
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
  transportExpenses: { type: Number, required: true, default: 0 },
});

const MonthCard = mongoose.model("MonthCard", monthCardSchema);

const mockupMonthCard = new MonthCard({
  user: "67a910c50f2e7168975baaf6",
  year: 2024,
  month: 2,
  totalExpenses: 1200,
  totalIncome: 1600,
  totalSavings: 400,
  fixedItems: [
    {
      description: "rent+bills+food",
      amount: 605,
      date: new Date("2025-02-01"),
    },
  ],
  subscriptionItems: [
    {
      description: "HBO",
      amount: 4.99,
      date: new Date("2025-02-01"),
    },
    {
      description: "Amazon no ads",
      amount: 1.99,
      date: new Date("2025-02-01"),
    },
  ],
  otherItems: [
    {
      description: "print label + adhesive",
      amount: 2.56,
      category: "67a91f012213777227c723ca",
      date: new Date("2025-02-01"),
    },
    {
      description: "Decathlon",
      amount: 76,
      category: "67a91f012213777227c723cb",
      date: new Date("2025-02-01"),
    },
  ],
  transportItems: [
    {
      description: "cabify",
      amount: 6.98,
      category: "67a91f012213777227c723cb",

      date: new Date("2025-02-01"),
    },
  ],

  fixedExpenses: 9,
  subscriptionExpenses: 9,
  otherExpenses: 9,
  transportExpenses: 9,
});

module.exports = { MonthCard };
