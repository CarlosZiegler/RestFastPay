const Order = require('../models/Order')
const Item = require('../models/Item')
const Table = require('../models/Table')

const getPricesFromListItems = require('../utils/getPricesFromListItems')
module.exports = {

    async show(req, res, next) {
        try {
            const order = await Order.findOne({ _id: req.params.id }).populate('userID').populate('itemsId').populate('tableId')
            res.json(order)
        } catch (error) {
            res.status(404).json(error)
        }
    },
    async update(req, res, next) {
        const _id = req.params.id
        try {

            const result = await Order.updateOne({ _id: _id }, { status: 'paid' })
            if (result.nModified === 1) {
                return res.status(200).json({ message: "Order updated" })
            }
        } catch (error) {
            return res.status(404).json(error)
        }
    }
}

