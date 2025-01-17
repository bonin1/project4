const sequelize = require('sequelize');
const db = require('../database');
const ProjectModel = require('./ProjectModel');

const ProjectMedia = db.define('ProjectMedia', {
    MediaID: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    primary_image: {
        type: sequelize.BLOB('long'),
        allowNull: true
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

module.exports = ProjectMedia;