const mongoose = require("mongoose");
const schema = mongoose.Schema;

const recipeSchema = new schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    ingredients: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],

    instructions: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    cookingTime: {
      type: Number,
      required: true,
    },

    servings: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Other"],
    },

    recipeImage: {
      type: String,
      default: "",
    },
    isPublished: {
      type: Boolean,
      default: false,
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timeStamps: true,
  },
);

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
