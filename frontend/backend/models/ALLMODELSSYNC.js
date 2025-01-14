const Project = require('./ProjectModel');
const ProjectMedia = require('./ProjectMedia');
const UserModel = require('./UserModel');
const ProjectAdditionalMedia = require('./ProjectAdditionalMedia');
const ContactModel = require('./ContactModel');
const ProjectDocument = require('./ProjectDocument');
const ProjectVideo = require('./ProjectVideo');

const syncModels = async () => {
    try {
        await Project.sync({ force: false });
        await ProjectMedia.sync({ force: false });
        await UserModel.sync({ force: false });
        await ProjectAdditionalMedia.sync({ force: false });
        await ContactModel.sync({ force: false });
        await ProjectDocument.sync({ force: false });
        await ProjectVideo.sync({ force: false });
        
        console.log('All models synchronized successfully');
    } catch (error) {
        console.error('Error syncing models:', error);
    }
};

module.exports = syncModels;