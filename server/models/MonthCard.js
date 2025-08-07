const mongoose = require("mongoose");

const monthCardSchema = new mongoose.Schema(
  {
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
    fixedItems: {
      name: {
        type: String,
        default: "The Non-negotiables",
      },
      items: [
        {
          description: { type: String, required: true },
          price: { type: Number, required: true },
          date: { type: Date, default: Date.now },
        },
      ],
    },
    fixedExpenses: { type: Number, required: true, default: 0 },

    subscriptionItems: {
      name: {
        type: String,
        default: "On Repeat",
      },
      items: [
        {
          description: { type: String, required: true },
          price: { type: Number, required: true },
          date: { type: Date, default: Date.now },
        },
      ],
    },
    subscriptionExpenses: { type: Number, required: true, default: 0 },

    otherItems: {
      name: {
        type: String,
        default: "Little Life Things",
      },
      items: [
        {
          description: { type: String, required: true },
          price: { type: Number, required: true },

          date: { type: Date, default: Date.now },
        },
      ],
    },

    otherExpenses: { type: Number, required: true, default: 0 },

    transportItems: {
      name: {
        type: String,
        default: "Out & About",
      },
      items: [
        {
          description: { type: String, required: true },
          price: { type: Number, required: true },

          date: { type: Date, default: Date.now },
        },
      ],
    },

    transportExpenses: { type: Number, required: true, default: 0 },

    foodItems: {
      name: {
        type: String,
        default: "Bits & Bites",
      },
      items: [
        {
          description: { type: String, required: true },
          price: { type: Number, required: true },

          date: { type: Date, default: Date.now },
        },
      ],
    },
    foodExpenses: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const MonthCard = mongoose.model("MonthCard", monthCardSchema);

module.exports = { MonthCard };
