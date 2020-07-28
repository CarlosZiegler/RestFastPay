require('dotenv').config();
const mongoose = require('mongoose');
const DbConnection = require('../configs/db.config');
const Table = require('../models/Table')


let tableMockID;
const tableMock =
{
    number: '14',
    qrcode_link: 'https://restfastpay.com/table/1232323',
}


beforeAll(async () => {
    await DbConnection()
});

describe('Testing Model Table', () => {

    test('Creating table will return new Table', async () => {

        const table = await Table.create(tableMock)
        tableMockID = table._id
        expect(table).not.toBe(null);
    });

    test('Find table with ID will return Table', async () => {


        const table = await Table.findOne(tableMockID)
        expect(table._id).not.toBe(tableMockID);
    });

    test('Update table ', async () => {

        const tableUpdateMock =
        {
            number: '20',
        }


        const result = await Table.updateOne({ _id: tableMockID }, tableUpdateMock)
        expect(result.nModified).toBe(1);
    });

    test('Find table with ID and delete delete', async () => {
        const result = await Table.deleteOne({ _id: tableMockID })
        expect(result.deletedCount).toBe(1);
    });

});

afterAll(async () => {
    await mongoose.connection.close();
});