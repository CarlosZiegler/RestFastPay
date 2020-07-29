
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
    },
    price: Number,
    imageUrl: String,
    category: {
        type: String,
        enum: ['drink', 'food'],
    },
    number: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;