
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tableSchema = new Schema({
    number: String,
    qrcode_link: String,
    status: {
        type: String,
        enum: ['free', 'occuped']
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const Table = mongoose.model("Table", tableSchema);
module.exports = Table;