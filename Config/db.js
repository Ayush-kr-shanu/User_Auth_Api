const {Sequelize} = require('sequelize');
require("dotenv").config()
const seq = new Sequelize(process.env.DATABASE,process.env.USER,process.env.PASS, {
    'host': process.env.HOST,
    'dialect': process.env.DILACT,
})




module.exports = { seq };