const sequelize = require('sequelize');
const db = require('../database');
const ProjectModel = require('./ProjectModel');

const ProjectDocument = db.define('ProjectDocument', {
    DocumentID: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    document: {  // Changed from Document to document
        type: sequelize.BLOB('long'),
        allowNull: false
    },
    ProjectID: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: ProjectModel,
            key: 'ProjectID'
        },
        onDelete: 'CASCADE'
    }
}, {
    freezeTableName: true
});

module.exports = ProjectDocument;