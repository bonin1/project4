const ProjectModel = require('../../models/ProjectModel');
const ProjectMedia = require('../../models/ProjectMedia');

// error on image handling

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
            const mediaPromises = [];

            // Handle main image
            if (req.files.Image) {
                mediaPromises.push(
                    ProjectMedia.create({
                        Image: req.files.Image[0].buffer,
                        MediaType: 'Image',
                        ProjectID: newProject.ProjectID
                    })
                );
            }

            // Handle additional images
            if (req.files.adidtional_images) {
                req.files.adidtional_images.forEach(file => {
                    mediaPromises.push(
                        ProjectMedia.create({
                            additional_images: file.buffer,
                            MediaType: 'Image',
                            ProjectID: newProject.ProjectID
                        })
                    );
                });
            }

            // Handle video
            if (req.files.Video) {
                mediaPromises.push(
                    ProjectMedia.create({
                        Video: req.files.Video[0].buffer,
                        MediaType: 'Video',
                        ProjectID: newProject.ProjectID
                    })
                );
            }

            // Handle document
            if (req.files.Document) {
                mediaPromises.push(
                    ProjectMedia.create({
                        Document: req.files.Document[0].buffer,
                        MediaType: 'Document',
                        ProjectID: newProject.ProjectID
                    })
                );
            }

            if (mediaPromises.length > 0) {
                await Promise.all(mediaPromises);
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
}