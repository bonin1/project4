const sequelize = require('sequelize');
const db = require('../database');
const ProjectModel = require('./ProjectModel');

const ProjectVideo = db.define('ProjectVideo', {
    VideoID: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    video: { 
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

module.exports = ProjectVideo;