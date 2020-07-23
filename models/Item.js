
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    price: Number,
    imageUrl: String,
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;