const express = require("express");
const UserController = require("../Controller/User.controller");
const ProductController = require("../Controller/Product.controller");
const { authenticate } = require("../Middleware/auth");


const routes=express.Router()

//All user routes
routes.post("/register", UserController.register)
routes.post("/login", UserController.login)

//Middleware
routes.use(authenticate)

//All product and image route
routes.get("/product", ProductController.getProducts)
routes.post("/product", ProductController.addProduct)
routes.get("/product/:productId", ProductController.getProductById)
routes.delete("/product/:productId", ProductController.deleteProductById)


module.exports={routes}