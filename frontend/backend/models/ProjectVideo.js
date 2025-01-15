const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const ProjectModel = require('./ProjectModel');

const ProjectVideo = sequelize.define('ProjectVideo', {
    VideoID: {
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
    video: {
        type: DataTypes.BLOB('long'),
        allowNull: true
    },
    videoType: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    freezeTableName: true
});

module.exports = ProjectVideo;