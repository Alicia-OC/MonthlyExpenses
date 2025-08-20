const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    lastLogin: {
      type: Date,
      default: Date.now, // This will trim the whitespace around the name
    },
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
    currency: {
      type: String,
      required: true,
      default: "€",
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
        savings: { type: Number, default: 0 },
        expenses: { type: Number, default: 0 },
        income: { type: Number, default: 0 },
      },
    ],
    defaultItems: {
      fixedItems: {
        name: {
          type: String,
          default: "The Non-negotiables",
        },
        items: {
          type: [
            {
              description: { type: String, required: true },
              price: { type: Number, required: true },
              date: { type: Date, default: Date.now },
            },
          ],
          default: [
            { description: "Rent + bills", price: 660 },
            { description: "Phone", price: 15 },
          ],
        },
      },
      subscriptionItems: {
        name: {
          type: String,
          default: "On Repeat",
        },
        items: {
          type: [
            {
              description: { type: String, required: true },
              price: { type: Number, required: true },
              date: { type: Date, default: Date.now },
            },
          ],
          default: [
            { description: "HBO", price: 4.99 },
            { description: "Amazon", price: 1.99 },
          ],
        },
      },
      otherItems: {
        name: {
          type: String,
          default: "Little Life Things",
        },
        items: {
          type: [
            {
              description: { type: String, required: true },
              price: { type: Number, required: true },
              date: { type: Date, default: Date.now },
            },
          ],
          default: [{ description: "Entertainment", price: 100 }],
        },
      },
      transportItems: {
        name: {
          type: String,
          default: "Out & About",
        },
        items: {
          type: [
            {
              description: { type: String, required: true },
              price: { type: Number, required: true },
              date: { type: Date, default: Date.now },
            },
          ],
          default: [{ description: "Cabify", price: 10 }],
        },
      },
      foodItems: {
        name: {
          type: String,
          default: "Bits & Bites",
        },
        items: {
          type: [
            {
              description: { type: String, required: true },
              price: { type: Number, required: true },
              date: { type: Date, default: Date.now },
            },
          ],
          default: [{ description: "Groceries", price: 300 }],
        },
      },
      totalIncome: {
        type: Number,
        default: 1600,
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
