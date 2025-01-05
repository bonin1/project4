const sequelize = require('sequelize');

const db = require('../database');

const UserModel = db.define('User', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    role: {
        type: sequelize.ENUM('admin', 'user'),
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    },
});

module.exports = UserModel;