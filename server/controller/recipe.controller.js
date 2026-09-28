const Recipe = require("../models/recipe.model");
const fs = require("fs");

const createRecipe = async (req, res) => {
  const file = req.file;

  let filePath;

  if (!file) {
    filePath = "";
  } else {
    filePath = file.filename;
  }

  const {
    title,
    description,
    ingredients,
    instructions,
    cookingTime,
    servings,
    category,
    isPublished,
    isFeatured,
  } = req.body;
  const published = isPublished === "true" || isPublished === true;
  const featured = isFeatured === "true" || isFeatured === true;

  if (featured && !published) {
    return res.status(400).json({
      success: false,
      message: "Cannot feature an unpublished recipe.Publish it first",
    });
  }

  const ingredientsArray = JSON.parse(ingredients);
  const instructionsArray = JSON.parse(instructions);

  const recipe = await Recipe.create({
    title,
    description,
    ingredients: ingredientsArray,
    instructions: instructionsArray,
    cookingTime,
    servings,
    category,
    recipeImage: filePath,
    author: req.user._id,
    isPublished: published,
    isFeatured: featured,
  });

  return res.status(201).json({
    success: true,
    message: "recipe created successfully",
    data: recipe,
  });
};

// const getRecipes = async (req, res) => {
//   // const recipes = await Recipe.find();
//   const recipes = await Recipe.find({ isPublished: true })
//     .populate("author", "name email")
//     .sort({ createdAt: -1 });

//   if (recipes.length === 0) {
//     return res.status(404).json({
//       success: false,
//       message: "no recipe added",
//     });
//   }

//   return res.status(200).json({
//     success: true,
//     message: "recipes fetched successfully",
//     data: recipes,
//   });
// };

const getRecipes = async (req, res) => {
  const {
    featured, 
    page = 1,
    limit = 9,
    sortBy = "createdAt",
    order = "desc",
  } = req.query;

  const filter = { isPublished: true };

  if (featured === "true") {
    filter.isFeatured = true;
  } else if (featured === "false") {
    filter.isFeatured = { $ne: true }; 
  }

  const pageNum = Math.max(Number(page), 1);
  const limitNum = Math.min(Math.max(Number(limit), 1), 50); // cap at 50
  const skip = (pageNum - 1) * limitNum;

  const sortOrder = order === "asc" ? 1 : -1;
  const sortOptions = { [sortBy]: sortOrder };

  const [recipes, total] = await Promise.all([
    Recipe.find(filter)
      .populate("author", "name email")
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum),
    Recipe.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limitNum);

  return res.status(200).json({
    success: true,
    message: "recipes fetched successfully",
    count: recipes.length,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1,
    },
    data: recipes, 
  });
};
const getRecipesAdmin = async (req, res) => {
  const recipes = await Recipe.find()
    .populate("author", "name email")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: "recipes fetched successfully",
    count: recipes.length,
    data: recipes,
  });
};

const getFeaturedRecipes = async (req, res) => {
  const recipes = await Recipe.find({
    isPublished: true,
    isFeatured: true,
  })
    .populate("author", "name email")
    .sort({ createdAt: -1 })
    .limit(6);

  if (recipes.length === 0) {
    return res.status(404).json({
      success: false,
      message: "no featured recipe",
    });
  }

  res.json({ success: true, data: recipes });
};

const toggleFeatured = async (req, res) => {
  const recipe = await Recipe.findById(req.params.recipeId);
  if (!recipe)
    return res.status(404).json({ success: false, message: "Not found" });

  if (!recipe.isPublished && !recipe.isFeatured) {
    return res.status(400).json({
      success: false,
      message: "Cannot feature an unpublished recipe. Publish it first.",
    });
  }

  recipe.isFeatured = !recipe.isFeatured;
  await recipe.save();
  res.json({ success: true, data: recipe });
};

const togglePublish = async (req, res) => {
  const recipe = await Recipe.findById(req.params.recipeId);
  if (!recipe) {
    return res.status(404).json({
      success: false,
      message: "Recipe not found",
    });
  }

  recipe.isPublished = !recipe.isPublished;

  if (!recipe.isPublished) {
    recipe.isFeatured = false;
  }

  await recipe.save();

  return res.status(200).json({
    success: true,
    message: `Recipe ${recipe.isPublished ? "published" : "unpublished"} successfully`,
    data: recipe,
  });
};

const getRecipe = async (req, res) => {
  const { recipeId } = req.params;

  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    return res.status(404).json({
      success: false,
      message: "recipe not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "recipe fetched successfully",
    data: recipe,
  });
};

const deleteRecipe = async (req, res) => {
  const { recipeId } = req.params;

  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    return res.status(404).json({
      success: false,
      message: "recipe not found",
    });
  }

  const oldRecipeImage = recipe.recipeImage;

  if (oldRecipeImage) {
    const filePath = "./uploads/" + oldRecipeImage;

    fs.unlink(filePath, (err) => {
      if (err) {
        console.log("error deleting recipe image", err);
      } else {
        console.log("recipe image deleted successfully");
      }
    });
  }

  const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

  return res.status(200).json({
    success: true,
    message: "recipe deleted successfully",
    data: deletedRecipe,
  });
};

const updateRecipe = async (req, res) => {
  const { recipeId } = req.params;

  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    return res.status(404).json({
      success: false,
      message: "recipe not found",
    });
  }

  const oldRecipeImage = recipe.recipeImage;

  if (req.file && oldRecipeImage) {
    const filePath = "./uploads/" + oldRecipeImage;

    fs.unlink(filePath, (err) => {
      if (err) {
        console.log("error removing old recipe image", err);
      } else {
        console.log("old recipe image removed successfully");
      }
    });
  }

  const {
    title,
    description,
    ingredients,
    instructions,
    cookingTime,
    servings,
    category,
    isPublished,
    isFeatured,
  } = req.body;

  const published = isPublished === "true" || isPublished === true;
  const featured = isFeatured === "true" || isFeatured === true;

  if (featured && !published) {
    return res.status(400).json({
      success: false,
      message: "cannot feature an unpublished recipe.Publish it first",
    });
  }

  const ingredientsArray = JSON.parse(ingredients);
  const instructionsArray = JSON.parse(instructions);

  const updatedRecipe = await Recipe.findByIdAndUpdate(
    recipeId,
    {
      title,
      description,
      ingredients: ingredientsArray,
      instructions: instructionsArray,
      cookingTime,
      servings,
      category,
      isPublished: published,
      isFeatured: featured,

      recipeImage: req.file ? req.file.filename : oldRecipeImage,
    },
    {
      returnDocument: "after",
    },
  );

  return res.status(200).json({
    success: true,
    message: "recipe updated successfully",
    data: updatedRecipe,
  });
};

const searchRecipes = async (req, res) => {
  const {
    keyword,
    category, 
    ingredient, 
    minCookingTime,
    maxCookingTime,
    minServings,
    maxServings,
    sortBy = "createdAt",
    order = "desc", 
    page = 1, 
    limit = 10,
  } = req.query;

  const query = {};

  if (keyword) {
    query.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ];
  }

  if (category) {
    query.category = category;
  }

  if (ingredient) {
    const ingredientList = ingredient
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    query.ingredients = {
      $in: ingredientList.map((i) => new RegExp(i, "i")),
    };
  }

  if (minCookingTime || maxCookingTime) {
    query.cookingTime = {};
    if (minCookingTime) query.cookingTime.$gte = Number(minCookingTime);
    if (maxCookingTime) query.cookingTime.$lte = Number(maxCookingTime);
  }

  if (minServings || maxServings) {
    query.servings = {};
    if (minServings) query.servings.$gte = Number(minServings);
    if (maxServings) query.servings.$lte = Number(maxServings);
  }

  const pageNum = Math.max(Number(page), 1);
  const limitNum = Math.max(Number(limit), 1);
  const skip = (pageNum - 1) * limitNum;

  const sortOrder = order === "asc" ? 1 : -1;
  const sortOptions = { [sortBy]: sortOrder };

  const [recipes, total] = await Promise.all([
    Recipe.find(query)
      .populate("author", "name email")
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum),
    Recipe.countDocuments(query),
  ]);

  if (recipes.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No recipes found matching your search",
      data: [],
      pagination: {
        total: 0,
        page: pageNum,
        limit: limitNum,
        totalPages: 0,
      },
    });
  }

  return res.status(200).json({
    success: true,
    message: "Recipes fetched successfully",
    count: recipes.length,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
      hasNextPage: pageNum < Math.ceil(total / limitNum),
      hasPrevPage: pageNum > 1,
    },
    data: recipes,
  });
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipe,
  deleteRecipe,
  updateRecipe,
  searchRecipes,
  getFeaturedRecipes,
  toggleFeatured,
  togglePublish,
  getRecipesAdmin,
};
