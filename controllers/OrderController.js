const Order = require('../models/Order')
const Item = require('../models/Item')
const Table = require('../models/Table')

const getPricesFromListItems = require('../utils/getPricesFromListItems')
module.exports = {
    async index(req, res, next) {
        try {
            const orders = await Order.find({ userID: req.user._id }).populate('tableId')
            res.json(orders)
        } catch (error) {
            res.status(404).json(error)
        }
    },
    async show(req, res, next) {
        try {
            const order = await Order.findOne({ _id: req.params.id }).populate('userID').populate('itemsId').populate('tableId')
            res.json(order)
        } catch (error) {
            res.status(404).json(error)
        }
    },
    async store(req, res, next) {
        try {
            const { itemsId, tableId, status } = req.body
            const setStatusTable = await Table.updateOne({ _id: tableId }, { status: 'occupied' })
            if (itemsId === undefined) {
                const result = await Order.create({ userID: req.user._id, status: 'pending', subtotal: 0, vat: 0, total: 0 })
                const order = await Order.findOne({ _id: result._id }).populate('itemsId').populate('tableId')
                return res.status(200).json(order)
            }
            const prices = await getPricesFromListItems(itemsId)
            const subtotal = prices.reduce((acc, item) => acc + item, 0)
            const vat = subtotal * 0.19
            const total = subtotal + vat

            const result = await Order.create({ userID: req.user._id, itemsId, tableId, status, subtotal, vat, total })
            if (!result) {
                return res.status(404).json({
                    message: 'Error',
                })
            }
            const order = await Order.findOne({ _id: result._id }).populate('itemsId').populate('tableId')
            return res.status(200).json(order)

        } catch (error) {
            console.log(error)
        }
    },
    async destroy(req, res, next) {
        const _id = req.params.id
        try {
            const result = await Order.deleteOne({ _id: _id })
            if (result.deletedCount === 1) {
                return res.status(200).json({ message: "Order deleted" })
            }
        } catch (error) {
            return res.status(404).json(error)
        }
    },
    async update(req, res, next) {
        const _id = req.params.id
        let data = req.body
        try {
            if (data.itemsId) {
                const prices = await getPricesFromListItems(data.itemsId)
                const subtotal = prices.reduce((acc, item) => acc + item, 0)
                const vat = subtotal * 0.19
                const total = subtotal + vat
                data = { ...data, subtotal, vat, total }
            }
            const result = await Order.updateOne({ _id: _id }, data)
            if (result.nModified === 1) {
                return res.status(200).json({ message: "Order updated" })
            }
        } catch (error) {
            return res.status(404).json(error)
        }
    }
}

