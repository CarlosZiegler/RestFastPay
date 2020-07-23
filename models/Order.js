
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userID: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    itemsId: [{
        type: Schema.Types.ObjectId,
        ref: 'Item',
        unique: false
    }],
    tableId: {
        type: Schema.Types.ObjectId,
        ref: 'Table',
        unique: false
    },
    subtotal: Number,
    vat: Number,
    total: Number,
    status: {
        type: String,
        enum: ['open', 'closed'],
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;