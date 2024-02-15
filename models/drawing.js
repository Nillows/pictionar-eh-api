const {Model, DataTypes} = require("sequelize");
const sequelize = require('../config/connection');

class Drawing extends Model {};

Drawing.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    filename: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize
  }
)

module.exports = Drawing;