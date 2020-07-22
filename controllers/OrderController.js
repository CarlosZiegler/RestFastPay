const Item = require('../models/Item')
module.exports = {
    // Create new User account
    async store(req, res, next) {
        res.json({
            message: 'Nova rota',
        });
    },
}

