const asyncHandler = require("express-async-handler");
const CategorySchema = require("../models/Category");
const { ServerDescription } = require("mongodb");

const Category = CategorySchema.Category;

const getCategory = asyncHandler(async (req, res) => {
  try {
    /**  const { userId } = req.body;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }*/
    Category.find({}).then((data) => {
      const formattedCategories = data.map(({ _id, name, description }) => {
        return { _id, name, description };
      });
      if (!formattedCategories.length) {
        res.status(200).json("No Items found");
      } else {
        res.status(200).json(formattedCategories);
        return formattedCategories;
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = { getCategory };
