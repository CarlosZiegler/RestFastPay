const Table = require('../models/Table')
module.exports = {
    async index(req, res, next) {
        try {
            const tables = await Table.find()
            res.json(tables)
        } catch (error) {
            res.status(404).json(error)
        }
    },
    async show(req, res, next) {
        try {
            const table = await Table.findOne({ _id: req.params.id })
            res.json(table)
        } catch (error) {
            res.status(404).json(error)
        }
    },
    async store(req, res, next) {
        try {

            const { number } = req.body
            const tables = await Table.findOne({ number: number })
            if (tables) {
                return res.json({
                    error: {
                        message: 'Table exist',
                    }
                })
            }
            const result = await Table.create({ number: `#${number}`, qrcode_link: `table/qrcode/${number}` })
            if (!result) {
                return res.json({
                    error: {
                        message: 'Error',
                    }
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
            const result = await Table.deleteOne({ _id: _id })
            if (result.deletedCount === 1) {
                return res.status(200).json({ message: "Table deleted" })
            }
        } catch (error) {
            return res.status(404).json(error)
        }
    },
    async update(req, res, next) {
        const _id = req.params.id
        const data = req.body
        try {
            const result = await Table.updateOne({ _id: _id }, data)
            if (result.nModified === 1) {
                return res.status(200).json({ message: "Table updated" })
            }
        } catch (error) {
            return res.status(404).json(error)
        }
    }
}

