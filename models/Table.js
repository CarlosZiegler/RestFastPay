
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tableSchema = new Schema({
    number: Number,
    qrcode_link: String,
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const Table = mongoose.model("Table", tableSchema);
module.exports = Table;