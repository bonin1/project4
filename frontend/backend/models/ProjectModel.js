const { DataTypes } = require('sequelize');
const db = require('../database');


const Project = db.define('Project', {
    ProjectID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ProjectName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ProjectDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ClientName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    StartDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    EndDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Status:{
        type: DataTypes.ENUM('Planned', 'Ongoing', 'Completed', 'On Hold', 'Cancelled'),
        defaultValue: 'Planned',
        allowNull: false
    },
    budget: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Location:{
        type: DataTypes.STRING,
        allowNull: false
    },
    ProjectManager: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    freezeTableName: true,
});


module.exports = Project;