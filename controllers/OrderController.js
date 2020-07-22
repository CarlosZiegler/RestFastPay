const Order = require('../models/Order')
const Item = require('../models/Item')
module.exports = {
    async index(req, res, next) {
        try {
            const orders = await Order.find()
            res.json(orders)
        } catch (error) {
            res.status(404).json(error)
        }
    },
    async store(req, res, next) {
        try {

            const { itemsId, tableId, status } = req.body
            //problema com promisses
            // const getPrice = async () => {
            //     const prices = await itemsId.map(async (itemID) => {
            //         const { price } = await Item.findById(itemID)
            //         // console.log(typeof price)
            //         return price
            //     })

            //     return prices
            // }

            // const getSubtotal = async () => {
            //     const prices = await getPrice()

            // }
            // getSubtotal()

            const result = await Order.create({ itemsId, tableId, status })
            if (!result) {
                return res.status(404).json({
                    message: 'Error',
                })
            }
            return res.status(200).json(result)

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
        const data = req.body
        try {
            const result = await Order.updateOne({ _id: _id }, data)
            if (result.nModified === 1) {
                return res.status(200).json({ message: "Order updated" })
            }
        } catch (error) {
            return res.status(404).json(error)
        }
    }
}

