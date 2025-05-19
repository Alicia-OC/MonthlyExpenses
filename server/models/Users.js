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
      minlength: 6,
    },
    avatar: { type: String, default: "../public/images/default-avatar.jpg" },
    cards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MonthCard",
        default: new mongoose.Types.ObjectId("67b379cc31d54e6b6a38479d"),
      },
    ],
    dataByYear: [
      {
        type: [
          {
            year: Number,
            month: String,
            savings: Number,
            expenses: Number,
            income: Number,
          },
        ],
        default: () => [
          {
            year: 2025,
            month: "April",
            savings: 100,
            expenses: 1000,
            income: 1100,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
