const sequelize = require("sequelize");
const {seq} = require("../Config/db"); 

const Image = seq.define("Image", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  url: {
    type: sequelize.STRING,
    allowNull: false,
  },
  product_id: {
    type: sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "products",
      key: "id",
    },
  },
});

module.exports = {Image};
