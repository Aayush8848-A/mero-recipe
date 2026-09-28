const express = require("express");

const {
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
} = require("../controller/recipe.controller");

const upload = require("../config/multer/multerConfig");
const isAuthenticatedUser = require("../middleware/isAuthenticatedUser.middleware");
const router = express.Router();

router.route("/search").get(searchRecipes);
router.route("/featured").get(getFeaturedRecipes);
router.route("/admin").get(isAuthenticatedUser, getRecipesAdmin);

router
  .route("/")
  .post(isAuthenticatedUser, upload.single("recipeImage"), createRecipe)
  .get(getRecipes)
  .get(getFeaturedRecipes);

router
  .route("/:recipeId")
  .get(getRecipe)
  .put(isAuthenticatedUser, upload.single("recipeImage"), updateRecipe)
  .delete(isAuthenticatedUser, deleteRecipe);

router.route("/:recipeId/featured").patch(isAuthenticatedUser, toggleFeatured);
router.route("/:recipeId/publish").patch(isAuthenticatedUser, togglePublish);

module.exports = router;
