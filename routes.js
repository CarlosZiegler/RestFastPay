const express = require("express");
const passport = require('passport');
const AuthController = require("./controllers/AuthController");
const ProfileController = require("./controllers/ProfileController");
const OrderController = require("./controllers/OrderController");
const ItemController = require("./controllers/ItemController");


const routes = express.Router();

//Documentation for Swagger https://github.com/fliptoo/swagger-express 
//http://localhost:3000/api-docs

/**
 * @swagger
 * /:
 *  get:
 *    description: landingpage
 *       
 */
routes.get("/", (req, res, next) => {
    res.json({ message: "Success" })
});

/**
 * @swagger
 * /signup:
 *  post:
 *    description: create a user
 *       
 */
routes.post("/signup", passport.authenticate('signup', { session: false }), AuthController.store);

/**
 * @swagger
 * /login:
 *  post:
 *    description: Sign in with email and password
 *       
 */
routes.post("/login", AuthController.index);

/**
 * @swagger
 * /main:
 *  get:
 *    description: Get all orders
 *       
 */
routes.get("/main", passport.authenticate('jwt', { session: false }), OrderController.store);


/**
 * @swagger
 * /items:
 *  get:
 *    description: Get all items
 *       
 */
routes.get("/items", passport.authenticate('jwt', { session: false }), ItemController.index);

/**
 * @swagger
 * /item/create:
 *  post:
 *    description: Create new item
 *       
 */
routes.post("/item/create", passport.authenticate('jwt', { session: false }), ItemController.store);

/**
 * @swagger
 * /item/update/:id:
 *  put:
 *    description: update item
 *       
 */
routes.put("/item/update/:id", passport.authenticate('jwt', { session: false }), ItemController.update);

/**
 * @swagger
 * /item/delete/:id:
 *  post:
 *    description: delete item
 *       
 */
routes.post("/item/delete/:id", passport.authenticate('jwt', { session: false }), ItemController.destroy);

module.exports = routes;
