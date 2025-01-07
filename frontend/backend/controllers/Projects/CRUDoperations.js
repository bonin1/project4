const ProjectModel = require('../../models/ProjectModel');
const ProjectMedia = require('../../models/ProjectMedia');
const ProjectAdditionalMedia = require('../../models/ProjectAdditionalMedia');

exports.CreateProject = async (req, res) => {
    try {

        const {
            ProjectName,
            ProjectDescription,
            ClientName,
            StartDate,
            EndDate,
            Status,
            budget,
            Location,
            ProjectManager
        } = req.body;

        const newProject = await ProjectModel.create({
            ProjectName,
            ProjectDescription,
            ClientName,
            StartDate,
            EndDate,
            Status,
            budget,
            Location,
            ProjectManager
        });

        if (req.files) {
            if (req.files.primary_image && req.files.primary_image[0]) {
                await ProjectMedia.create({
                    ProjectID: newProject.ProjectID,
                    primary_image: req.files.primary_image[0].buffer,
                    MediaType: 'Image'
                });
            }

            if (req.files.additional_images) {
                const additionalImagesPromises = req.files.additional_images.map(file => 
                    ProjectAdditionalMedia.create({
                        ProjectID: newProject.ProjectID,
                        additional_images: file.buffer,
                        MediaType: 'Image'
                    })
                );
                await Promise.all(additionalImagesPromises);
            }

            if (req.files.Video && req.files.Video[0]) {
                await ProjectMedia.create({
                    ProjectID: newProject.ProjectID,
                    Video: req.files.Video[0].buffer,
                    MediaType: 'Video'
                });
            }

            if (req.files.Document && req.files.Document[0]) {
                await ProjectMedia.create({
                    ProjectID: newProject.ProjectID,
                    Document: req.files.Document[0].buffer,
                    MediaType: 'Document'
                });
            }
        }

        res.status(201).json({
            success: true,
            data: newProject,
            message: 'Project and media created successfully'
        });
    } catch (error) {
        console.error('Detailed error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};