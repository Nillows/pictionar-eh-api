const {Model, DataTypes} = require("sequelize");
const sequelize = require('../config/connection');

class Answer extends Model {};

Answer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    word: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize
  }
)

module.exports = Answer;