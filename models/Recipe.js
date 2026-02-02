const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: ['Breakfast', 'Side Dish', 'Main Dish', 'Dessert', 'Appetizer', 'Baked Good'],
    },
    ingredients: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    tags: {
        type: [String],
        enum: ['Casserole', 'Chocolate', 'Chicken', 'Beef', 'Fish', 'Pasta', 'Dessert']
    },
    source: {
        type: String
    }
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;