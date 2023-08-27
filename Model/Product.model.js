const sequelize = require("sequelize");
const { seq } = require("../Config/db");
const { User } =require("./user.model")
const { Image } = require("./Image.model")


const Product = seq.define("Product", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: sequelize.STRING,
    allowNull: false,
  },
  SKU: {
    type: sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: sequelize.DATE,
    allowNull: false,
    defaultValue: sequelize.NOW,
  },
  updatedAt: {
    type: sequelize.DATE,
    allowNull: false,
    defaultValue: sequelize.NOW,
  },
  user_id: {
    type: sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  }
});

Product.belongsTo(User, {
  foreignKey: "user_id", 
  as: "user", 
});

Product.hasMany(Image, {
  foreignKey: "product_id", 
});

module.exports={Product}