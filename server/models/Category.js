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
  name: "Unexpected",
  description: "Unexpected expenses like vet, medicine, replacement, etc.",
});


const guiltyPleasureCategory = new Category({
  name: "Guilty pleasure",
  description:
    "Spontaneous or unnecessary purchases like snacks, takeout or something not 100% necessary.",
});

const giftExpenseCategory = new Category({
  name: "Gifts",
  description: "A gift or present for someone else",
});


module.exports = {Category};
