const ProjectModel = require('../../models/ProjectModel');
const ProjectMedia = require('../../models/ProjectMedia');
const upload = require('../../config/UploadConfig');

const handleUpload = upload.fields([
    { name: 'Image', maxCount: 1 },
    { name: 'aditional_images', maxCount: 5 },
    { name: 'Video', maxCount: 1 },
    { name: 'Document', maxCount: 1 }
]);

exports.CreateProject = async (req, res) => {
    try {
        handleUpload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }

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
                const mediaPromises = Object.entries(req.files).map(async ([type, files]) => {
                    if (type !== 'aditional_images') {
                        return ProjectMedia.create({
                            [type]: files[0].buffer,
                            MediaType: type === 'Image' ? 'Image' : type === 'Video' ? 'Video' : 'Document',
                            ProjectID: newProject.ProjectID
                        });
                    }
                    if (type === 'aditional_images') {
                        return Promise.all(files.map(file => 
                            ProjectMedia.create({
                                aditional_images: file.buffer,
                                MediaType: 'Image',
                                ProjectID: newProject.ProjectID
                            })
                        ));
                    }
                });

                await Promise.all(mediaPromises);
            }

            res.status(201).json({
                success: true,
                data: newProject,
                message: 'Project and media created successfully'
            });
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}