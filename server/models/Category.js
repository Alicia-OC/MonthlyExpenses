const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const unexpectedExpenseCategory = new Category({
  name: "Unexpected expense",
  description: "Unexpected expenses like vet, medicine, replacement, etc.",
});
await unexpectedExpenseCategory.save();

const guiltyPleasureCategory = new Category({
  name: "Guilty pleasure expense",
  description:
    "Spontaneous or unnecessary purchases like snacks, takeout or something not 100% necessary.",
});
await guiltyPleasureCategory.save();

const giftExpenseCategory = new Category({
  name: "Gifts",
  description: "A gift or present for someone else",
});
await giftExpenseCategory.save();

const Category = mongoose.model(
  "Category",
  CategorySchema
);

module.exports = Category;
