require('dotenv').config();
const mongoose = require('mongoose');
const DbConnection = require('../configs/db.config');
const Item = require('../models/Item')


let itemMockID;
const itemMock =
{

    description: 'hamburguer',
    value: 14.50,
    urlImage: 'https://restfastpay.com/item/image/1232323',
}


beforeAll(async () => {
    await DbConnection()
});

describe('Testing Model Item', () => {

    test('Creating item will return new Item', async () => {

        const item = await Item.create(itemMock)
        itemMockID = item._id
        expect(item).not.toBe(null);
    });

    test('Find item with ID will return Item', async () => {


        const item = await Item.findOne(itemMockID)
        expect(item._id).not.toBe(itemMockID);
    });

    test('Update item ', async () => {

        const itemUpdateMock =
        {
            value: 20.00,
        }


        const result = await Item.updateOne({ _id: itemMockID }, itemUpdateMock)
        expect(result.nModified).toBe(1);
    });

    test('Find item with ID and delete delete', async () => {
        const result = await Item.deleteOne({ _id: itemMockID })
        expect(result.deletedCount).toBe(1);
    });

});

afterAll(async () => {
    await mongoose.connection.close();
});