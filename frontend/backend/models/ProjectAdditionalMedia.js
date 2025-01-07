const { DataTypes } = require('sequelize');
const db = require('../database');
const ProjectModel = require('./ProjectModel');

const ProjectAdditionalMedia = db.define('ProjectAdditionalMedia', {
    MediaID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    additional_images: {
        type: DataTypes.BLOB('long'),
        allowNull: false
    },
    MediaType: {
        type: DataTypes.ENUM('Image', 'Video', 'Document'),
        allowNull: false
    },
    ProjectID: {
        type: DataTypes.INTEGER,
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

module.exports = ProjectAdditionalMedia;