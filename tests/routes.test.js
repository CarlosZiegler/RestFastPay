const request = require("supertest");
const app = require("../app");
const mongoose = require('mongoose');
const User = require('../models/User')
const Item = require('../models/Item')
const Table = require('../models/Table')
const Order = require('../models/Order')

const USER_MOCK =
{
  email: "tester@example.com",
  password: "12345678",
}
let USER_MOCK_TOKEN;

const ITEM_MOCK =
{
  "name": "Hamburguer Test",
  "price": 18.40,
  "urlImage": "https://restfastpay.com/item/image/1232323"
}
let ITEM_MOCK_ID;

const TABLE_MOCK =
{
  "number": '22'
}
let TABLE_MOCK_ID;

const ORDER_MOCK =
{
  "itemsId": ["5f1853311dd40a92e60296c7"],
  "tableId": "5f18601304ca51a18ca918ff",
  "status": "pending"
}

let ORDER_MOCK_ID;

beforeEach(() => {
  jest.setTimeout(4000);
});

describe("GET / ", () => {
  test("It should respond with an Ok", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /signup ", () => {
  test("It should respond with an Ok", async () => {
    const response = await request(app)
      .post("/signup")
      .set({ "content-type": "application/x-www-form-urlencoded" })
      .send(`email=${USER_MOCK.email}&password=${USER_MOCK.password}`)
    expect(response.unauthorized).toBe(false);
  });
});

describe("POST /login ", () => {
  test("It should sign in user with correct credentials", async () => {
    const response = await request(app)
      .post("/login")
      .set({ "content-type": "application/x-www-form-urlencoded" })
      .send(`email=${USER_MOCK.email}&password=${USER_MOCK.password}`)
    USER_MOCK_TOKEN = response.body.token
    expect(response.body.token).not.toBe(null);
  });

  test("It should sign in with wrong password", async () => {
    const response = await request(app)
      .post("/login")
      .set({ "content-type": "application/x-www-form-urlencoded" })
      .send(`email=${USER_MOCK.email}&password=${12121212}`)

    expect(response.body.hasOwnProperty('error')).toBe(true);
  });

  test("It should sign in with wrong email", async () => {
    const response = await request(app)
      .post("/login")
      .set({ "content-type": "application/x-www-form-urlencoded" })
      .send(`email=notexist@example.com&password=${12121212}`)

    expect(response.body.hasOwnProperty('error')).toBe(true);
  });
});

describe("GET /orders, this is a secure route ", () => {
  test("It should respond with unauthorized without token", async () => {
    const response = await request(app).get("/orders");
    expect(response.unauthorized).toBe(true);
  });
  test("It should respond with an Ok", async () => {
    const response = await request(app)
      .get("/orders")
      .set({
        "authorization": `Bearer ${USER_MOCK_TOKEN}`
      })
    expect(response.unauthorized).toBe(false);
  });
});


// Test Items
describe("GET /items ", () => {
  test("get all items", async () => {
    const response = await request(app)
      .get("/items")
      .set({
        "authorization": `Bearer ${USER_MOCK_TOKEN}`
      })
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /item/create ", () => {
  test("It should respond with an 200", async () => {
    const response = await request(app)
      .post("/item/create")
      .set({
        "authorization": `Bearer ${USER_MOCK_TOKEN}`
      })
      .send(ITEM_MOCK)
    ITEM_MOCK_ID = response.body._id
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /item/:id ", () => {
  test("get item by id", async () => {
    const response = await request(app)
      .get(`/item/${ITEM_MOCK_ID}`)
      .set({
        "authorization": `Bearer ${USER_MOCK_TOKEN}`
      })
    expect(response.statusCode).toBe(200);
  });
});

describe("UPDATE /item/update ", () => {
  test("It should respond with an 200", async () => {
    const newPrice = { "price": 388.40 }
    const response = await request(app)
      .put(`/item/update/${ITEM_MOCK_ID}`)
      .set({
        "authorization": `Bearer ${USER_MOCK_TOKEN}`
      })
      .send(newPrice)

    const { price } = await Item.findById(ITEM_MOCK_ID)

    expect(price).toBe(newPrice.price);
  });
});

describe("DELETE /item/delete ", () => {
  test("It should respond with an 200", async () => {
    const response = await request(app)
      .delete(`/item/delete/${ITEM_MOCK_ID}`)
      .set({
        "authorization": `Bearer ${USER_MOCK_TOKEN}`
      })
    expect(response.statusCode).toBe(200);
  });
});


// Test Table
describe("GET /tables ", () => {
  test("get all tables", async () => {
    const response = await request(app)
      .get("/tables")
      .set({
        "authorization": `Bearer ${USER_MOCK_TOKEN}`
      })
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /table/create ", () => {
  test("It should respond with an 200", async () => {
    const response = await request(app)
      .post("/table/create")
      .set({
        "authorization": `Bearer ${USER_MOCK_TOKEN}`
      })
      .send(TABLE_MOCK)
    TABLE_MOCK_ID = response.body._id
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /table/:id ", () => {
  test("get table by id", async () => {
    const response = await request(app)
      .get(`/item/${TABLE_MOCK_ID}`)
      .set({
        "authorization": `Bearer ${USER_MOCK_TOKEN}`
      })
    expect(response.statusCode).toBe(200);
  });
});

describe("UPDATE /table/update ", () => {
  test("It should respond with an 200", async () => {
    const newNumber = { "number": '10' }
    const response = await request(app)
      .put(`/table/update/${TABLE_MOCK_ID}`)
      .set({
        "authorization": `Bearer ${USER_MOCK_TOKEN}`
      })
      .send(newNumber)

    const { number } = await Table.findById(TABLE_MOCK_ID)

    expect(number).toBe(newNumber.number);
  });
});

describe("DELETE /table/delete ", () => {
  test("It should respond with an 200", async () => {
    const response = await request(app)
      .delete(`/table/delete/${TABLE_MOCK_ID}`)
      .set({
        "authorization": `Bearer ${USER_MOCK_TOKEN}`
      })
    expect(response.statusCode).toBe(200);
  });
});


// Test Table
describe("GET /orders ", () => {
  test("get all orders", async () => {
    const response = await request(app)
      .get("/orders")
      .set({
        "authorization": `Bearer ${USER_MOCK_TOKEN}`
      })
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /order/create ", () => {
  test("It should respond with an 200", async () => {
    const response = await request(app)
      .post("/order/create")
      .set({
        "authorization": `Bearer ${USER_MOCK_TOKEN}`
      })
      .send(ORDER_MOCK)
    ORDER_MOCK_ID = response.body._id
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /order/:id ", () => {
  test("get order by id", async () => {
    const response = await request(app)
      .get(`/item/${ORDER_MOCK_ID}`)
      .set({
        "authorization": `Bearer ${USER_MOCK_TOKEN}`
      })
    expect(response.statusCode).toBe(200);
  });
});

describe("UPDATE /order/update ", () => {
  test("It should respond with an 200", async () => {
    const updateItemsofOrder = { "itemsId": ["5f1853311dd40a92e60296c7", "5f196f2dea74090bf127f649"] }
    const response = await request(app)
      .put(`/order/update/${ORDER_MOCK_ID}`)
      .set({
        "authorization": `Bearer ${USER_MOCK_TOKEN}`
      })
      .send(updateItemsofOrder)

    const { itemsId } = await Order.findById(ORDER_MOCK_ID)
    expect(itemsId.length).toBe(2);
  });
});

describe("DELETE /order/delete ", () => {
  test("It should respond with an 200", async () => {
    const response = await request(app)
      .delete(`/order/delete/${ORDER_MOCK_ID}`)
      .set({
        "authorization": `Bearer ${USER_MOCK_TOKEN}`
      })
    expect(response.statusCode).toBe(200);
  });
});

afterAll(async () => {
  await User.deleteOne({ email: USER_MOCK.email })
  await mongoose.connection.close();
});



