const sequelize = require('sequelize');
const db = require('../database');
const ProjectModel = require('./ProjectModel');

const ProjectMedia = db.define('ProjectMedia', {
    MediaID: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Image: {
        type: sequelize.BLOB('long'),
        allowNull: false
    },
    aditional_images:{
        type: sequelize.BLOB('long'),
        allowNull: true
    },
    Video: {
        type: sequelize.BLOB('long'),
        allowNull: false
    },
    Document: {
        type: sequelize.BLOB('long'),
        allowNull: false
    },
    MediaType: {
        type: sequelize.ENUM('Image', 'Video', 'Document'),
        allowNull: false
    },
    ProjectID: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: ProjectModel,
            key: 'ProjectID'
        }
    }
}, {
    freezeTableName: true
});

module.exports = ProjectMedia;