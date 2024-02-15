const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    PasswordAuth(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true
    },
    profile_picture: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    friends: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    highscore: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
}, {
    sequelize,
    hooks: {
        beforeCreate: async(newUserData) => {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData
        },
        beforeUpdate: async(updatedUserData) => {
            console.log("before update:", updatedUserData)
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            console.log("after update:", updatedUserData)
            return updatedUserData
        }
    }
})

module.exports = User;