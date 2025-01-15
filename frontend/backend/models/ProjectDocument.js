const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const ProjectModel = require('./ProjectModel');

const ProjectDocument = sequelize.define('ProjectDocument', {
    DocumentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ProjectID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ProjectModel,
            key: 'ProjectID'
        },
        onDelete: 'CASCADE'
    },
    document: {
        type: DataTypes.BLOB('long'),
        allowNull: true
    },
    documentType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    documentName: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    freezeTableName: true
});

module.exports = ProjectDocument;