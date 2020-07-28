require('dotenv').config();
const mongoose = require('mongoose');
const DbConnection = require('../configs/db.config');
const Order = require('../models/Order')


let orderMockID;
const orderMock =
{
    itemsId: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
    tableId: new mongoose.Types.ObjectId(),
    subtotal: 14.50,
    vat: 0.19 * 14.50,
    total: 14.50 + (0.19 * 14.50),
    status: 'pending'
}


beforeAll(async () => {
    await DbConnection()
});

describe('Testing Model Order', () => {

    test('Creating order will return new Order', async () => {

        const order = await Order.create(orderMock)
        orderMockID = order._id
        expect(order).not.toBe(null);
    });

    test('Find order with ID will return Order', async () => {


        const order = await Order.findOne(orderMockID)
        expect(order._id).not.toBe(orderMockID);
    });

    test('Update order ', async () => {

        const orderUpdateMock =
        {
            subtotal: 20.00,
        }


        const result = await Order.updateOne({ _id: orderMockID }, orderUpdateMock)
        expect(result.nModified).toBe(1);
    });

    test('Find order with ID and delete delete', async () => {
        const result = await Order.deleteOne({ _id: orderMockID })
        expect(result.deletedCount).toBe(1);
    });

});

afterAll(async () => {
    await mongoose.connection.close();
});