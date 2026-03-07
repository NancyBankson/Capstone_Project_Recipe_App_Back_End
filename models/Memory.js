const { Schema, model } = require('mongoose');

const memorySchema = new Schema({
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
    contents: {
        type: String
    },
    notes: {
        type: String
    },
    privacy: {
        type: String,
        enum: ['Public', 'Private'],
    },
    image: {
        type: String
    }
});

const Memory = model('Memory', memorySchema);

module.exports = Memory;