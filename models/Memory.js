const { Schema, model } = require('mongoose');

const memorySchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    contents: {
        type: String
    },
    image: {
        type: String
    }
});

const Memory = model('Memory', memorySchema);

module.exports = Memory;