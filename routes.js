const express = require("express");
const passport = require('passport');
const AuthController = require("./controllers/AuthController");
const OrderController = require("./controllers/OrderController");
const TableController = require("./controllers/TableController");
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
 *    description: create new item
 *       
 */
routes.post("/item/create", passport.authenticate('jwt', { session: false }), ItemController.store);

/**
 * @swagger
 * /item/update/:id:
 *  get:
 *    description: get item by ID
 *       
 */
routes.get("/item/:id", passport.authenticate('jwt', { session: false }), ItemController.show);

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
 *  delete:
 *    description: delete item
 *       
 */
routes.delete("/item/delete/:id", passport.authenticate('jwt', { session: false }), ItemController.destroy);


/**
 * @swagger
 * /orders:
 *  get:
 *    description: Get all orders
 *       
 */
routes.get("/orders", passport.authenticate('jwt', { session: false }), OrderController.index);

/**
 * @swagger
 * /order/create:
 *  post:
 *    description: create new order
 *       
 */
routes.post("/order/create", passport.authenticate('jwt', { session: false }), OrderController.store);

/**
 * @swagger
 * /order/update/:id:
 *  get:
 *    description: get order by ID
 *       
 */
routes.get("/order/:id", passport.authenticate('jwt', { session: false }), OrderController.show);
/**
 * @swagger
 * /order/update/:id:
 *  put:
 *    description: update order
 *       
 */
routes.put("/order/update/:id", passport.authenticate('jwt', { session: false }), OrderController.update);

/**
 * @swagger
 * /order/delete/:id:
 *  delete:
 *    description: delete order
 *       
 */
routes.delete("/order/delete/:id", passport.authenticate('jwt', { session: false }), OrderController.destroy);
/**
 * @swagger
 * /tables:
 *  get:
 *    description: Get all tables
 *       
 */
routes.get("/tables", passport.authenticate('jwt', { session: false }), TableController.index);

/**
 * @swagger
 * /table/create:
 *  post:
 *    description: create new table
 *       
 */
routes.post("/table/create", passport.authenticate('jwt', { session: false }), TableController.store);

/**
 * @swagger
 * /table/update/:id:
 *  get:
 *    description: get table by ID
 *       
 */
routes.get("/table/:id", passport.authenticate('jwt', { session: false }), TableController.show);
/**
 * @swagger
 * /table/update/:id:
 *  put:
 *    description: update table
 *       
 */
routes.put("/table/update/:id", passport.authenticate('jwt', { session: false }), TableController.update);

/**
 * @swagger
 * /table/delete/:id:
 *  delete:
 *    description: delete table
 *       
 */
routes.delete("/table/delete/:id", passport.authenticate('jwt', { session: false }), TableController.destroy);

module.exports = routes;
