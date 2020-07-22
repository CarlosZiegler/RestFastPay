const request = require("supertest");
const app = require("../app");
const mongoose = require('mongoose');
const User = require('../models/User')

const USER_MOCK =
{
  email: "tester@example.com",
  password: "12345678",
}
let USER_MOCK_TOKEN;

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

afterAll(async () => {
  await User.deleteOne({ email: USER_MOCK.email })
  await mongoose.connection.close();
});



