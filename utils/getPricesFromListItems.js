const Item = require('../models/Item')

const getPricesFromListItems = async (arrayIds) => {
    try {
        return await Promise.all(arrayIds
            .map(async id => {
                const [item] = await Item.find({ _id: id })
                return item.price
            }))
    } catch (error) {
        return error
    }
}

module.exports = getPricesFromListItems