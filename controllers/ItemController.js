const Item = require('../models/Item')
module.exports = {

    async index(req, res, next) {
        try {
            const items = await Item.find()
            res.json(items)
        } catch (error) {
            res.status(404).json(error)
        }
    },
    async show(req, res, next) {
        try {
            const item = await Item.findOne({ _id: req.params.id })
            res.json(item)
        } catch (error) {
            res.status(404).json(error)
        }
    },
    async store(req, res, next) {
        try {
            const { name, price, category } = req.body
            const item = await Item.findOne({ name: name })
            if (item) {
                return res.status(404).json({
                    message: 'Item exist',
                })
            }
            const itemNumber = await Item.find().countDocuments()
            const result = await Item.create({ name, price, number: itemNumber + 1, category })
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
            const result = await Item.deleteOne({ _id: _id })
            if (result.deletedCount === 1) {
                return res.status(200).json({ message: "item deleted" })
            }
        } catch (error) {
            return res.status(404).json(error)
        }
    },
    async update(req, res, next) {

        const _id = req.params.id
        const data = req.body
        try {
            const result = await Item.updateOne({ _id: _id }, data)
            if (result.nModified === 1) {
                return res.status(200).json({ message: "item updated" })
            }

        } catch (error) {
            return res.status(404).json(error)
        }
    }
}

