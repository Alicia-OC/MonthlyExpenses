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
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
