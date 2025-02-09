const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);


const unexpectedExpenseCategory = new Category({
  name: "Unexpected expense",
  description: "Unexpected expenses like vet, medicine, replacement, etc.",
});

unexpectedExpenseCategory.save();

const guiltyPleasureCategory = new Category({
  name: "Guilty pleasure expense",
  description:
    "Spontaneous or unnecessary purchases like snacks, takeout or something not 100% necessary.",
});
guiltyPleasureCategory.save();

const giftExpenseCategory = new Category({
  name: "Gifts",
  description: "A gift or present for someone else",
});
giftExpenseCategory.save();


module.exports = {Category};
