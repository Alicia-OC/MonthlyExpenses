const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // This will trim the whitespace around the name
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    avatar: { type: String, default: "../public/images/default-avatar.jpg" },
    cards: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MonthCard",
        },
      ],
    },
    dataByYear: [
      {
        year: { type: Number, required: true },
        month: { type: String, required: true },
        savings: { type: Number, default: 0 },
        expenses: { type: Number, default: 0 },
        income: { type: Number, default: 0 },
      },
    ],
    defaultItems: {
      type: [
        {
          fixedItems: {
            items: [
              {
                description: { type: String, required: true },
                price: { type: Number, required: true },
                date: { type: Date, default: Date.now },
              },
            ],
          },
        },
        {
          subscriptionItems: {
            items: [
              {
                description: { type: String, required: true },
                price: { type: Number, required: true },
                date: { type: Date, default: Date.now },
              },
            ],
          },
        },
        {
          otherItems: {
            items: [
              {
                description: { type: String, required: true },
                price: { type: Number, required: true },
                date: { type: Date, default: Date.now },
              },
            ],
          },
        },
        {
          transportItems: {
            items: [
              {
                description: { type: String, required: true },
                price: { type: Number, required: true },
                date: { type: Date, default: Date.now },
              },
            ],
          },
        },
        {
          foodItems: {
            items: [
              {
                description: { type: String, required: true }, // Changed from false to true
                price: { type: Number, required: true }, // Changed from false to true
                date: { type: Date, default: Date.now },
              },
            ],
          },
        },
        { totalIncome: { type: Number, required: true } },
      ],
      default: [
        {
          fixedItems: {
            items: [
              { description: "Rent + bills", price: 660 },
              { description: "Phone", price: 15 },
            ],
          },
        },
        {
          subscriptionItems: {
            items: [
              { description: "HBO", price: 4.99 },
              { description: "Amazon", price: 1.99 },
            ],
          },
        },
        {
          otherItems: {
            items: [{ description: "Entertainment", price: 100 }],
          },
        },
        {
          transportItems: {
            items: [{ description: "Cabify", price: 10 }],
          },
        },
        {
          foodItems: {
            items: [{ description: "Groceries", price: 300 }],
          },
        },
        { totalIncome: 1600 },
      ],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
