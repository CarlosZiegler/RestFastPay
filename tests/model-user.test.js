require('dotenv').config();
const mongoose = require('mongoose');
const DbConnection = require('../configs/db.config');
const User = require('../models/User')


let userMockID;


beforeAll(async () => {
    await DbConnection()
});

describe('Testing Model User', () => {

    test('Creating user will return new User', async () => {

        const userMock =
        {
            displayName: "Carlos Ziegler",
            password: "12345678",
            email: "carlos@example.com",
            orders: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()]
        }

        const user = await User.create(userMock)
        userMockID = user._id
        expect(user).not.toBe(null);
    });

    test('Find user wit ID will return User', async () => {

        const userMock =
        {
            displayName: "Carlos Ziegler",
        }
        const user = await User.findOne(userMock)
        expect(user._id).not.toBe(userMockID);
    });

    test('Update user ', async () => {

        const userUpdateMock =
        {
            displayName: "Carlos Ricardo Ziegler",
        }


        const result = await User.updateOne({ _id: userMockID }, userUpdateMock)
        expect(result.nModified).toBe(1);
    });

    test('Check password with wrong password', async () => {

        const user = await User.findOne(userMockID)
        const result = await user.isValidPassword("123456789")
        expect(result).toBe(false);
    });
    test('Check password with correct password', async () => {

        const user = await User.findOne(userMockID)
        const result = await user.isValidPassword("12345678")
        expect(result).toBe(true);
    });

    test('Find user with ID and delete User', async () => {
        const result = await User.deleteOne({ _id: userMockID })
        expect(result.deletedCount).toBe(1);
    });

});

afterAll(async () => {
    await mongoose.connection.close();
});