const router = require('express').Router();
const { authMiddleware } = require('../utils/auth');
const recipeController = require('../controllers/recipeController');

// Apply authMiddleware to all routes in this file
router.use(authMiddleware);

router.get('/', recipeController.findRecipes);
router.post('/', recipeController.createRecipe);
router.put('/:id', recipeController.editRecipe);
router.delete('/:id', recipeController.deleteRecipe);
router.get('/:id', recipeController.findOneRecipe);

module.exports = router;