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
    cards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MonthCard",
        default: new mongoose.Types.ObjectId("67b379cc31d54e6b6a38479d"),
      },
    ],
    avatar: {
      type: String,
      default: "/images/default-avatar.jpg",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
