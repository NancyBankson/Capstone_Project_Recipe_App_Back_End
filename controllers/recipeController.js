const Recipe = require("../models/Recipe");

// GET /api/recipes - Get all recipes for the logged-in user
async function findRecipes(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'You must be logged in to see this!' });
        }
        const recipes = await Recipe.find({ user: req.user._id });
        res.json(recipes);
    } catch (err) {
        res.status(500).json(err);
    }
}

// POST /api/recipes - Create a new recipe
async function createRecipe(req, res) {
    try {
        const recipe = await Recipe.create({
            user: req.user._id,
            title: req.body.title,
            category: req.body.category,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            image: req.body.image,
            tags: req.body.tags,
            source: req.body.source
        });
        res.status(201).json(recipe);
    } catch (err) {
        res.status(400).json(err);
    }
}

// PUT /api/recipes/:id - Update a recipe
async function editRecipe(req, res) {
    try {
        // This needs an authorization check
        if (!req.user) {
            return res.status(403).json({ message: "User is not authorized to update this recipe." });
        } else {
            const record = await Recipe.findById(req.params.id);
            if (record.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'User not authorized!' });
            } else {
                const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
                if (!recipe) {
                    return res.status(404).json({ message: 'No recipe found with this id!' });
                }
                res.json(recipe);
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// DELETE /api/recipes/:id - Delete a recipe
async function deleteRecipe(req, res) {
    try {
        // This needs an authorization check
        if (!req.user) {
            return res.status(403).json({ message: "User is not authorized to update this recipe." });
        } else {
            const record = await Recipe.findById(req.params.id);
            if (record.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'User not authorized!' });
            } else {
                const recipe = await Recipe.findByIdAndDelete(req.params.id);
                if (!recipe) {
                    return res.status(404).json({ message: 'No recipe found with this id!' });
                }
                res.json({ message: 'Recipe deleted!' });
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// Find single recipe by Id
async function findOneRecipe(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'You must be logged in to see this!' });
        } else {
            const record = await Recipe.findById(req.params.id);
            if (record.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'User not authorized!' });
            } else {
                const recipe = await Recipe.findById(req.params.id);
                if (recipe) {
                    res.json(recipe);
                }
            }
        }

    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    findRecipes,
    createRecipe,
    editRecipe,
    deleteRecipe,
    findOneRecipe
};