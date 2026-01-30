const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: [String],
        enum: ['Breakfast', 'Side Dish', 'Main Dish', 'Dessert', 'Appetizer', 'Baked Good'],
    },
    instructions: {
        type: String,
        required: true
    },
    Image: {
        type: String
    },
    Tags: {
        type: [String],
        enum: ['Casserole', 'Chocolate', 'Chicken', 'Beef', 'Fish', 'Pasta', 'Dessert']
    },
    Source: {
        type: String
    }
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;