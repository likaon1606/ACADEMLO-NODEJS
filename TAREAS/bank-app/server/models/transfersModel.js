const { DataTypes } = require("sequelize");
const { db } = require("../utils/database");

const Transfer = db.define("transfer", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  amount: {
    type: DataTypes.INTEGER,
  },
  senderUserId: {
    type: DataTypes.STRING,
  },
  receiverUserId: {
    type: DataTypes.STRING,
  },
});

module.exports = { Transfer };
