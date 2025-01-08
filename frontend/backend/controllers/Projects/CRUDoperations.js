const ProjectModel = require('../../models/ProjectModel');
const ProjectMedia = require('../../models/ProjectMedia');
const ProjectAdditionalMedia = require('../../models/ProjectAdditionalMedia');
const AppError = require('../../utils/AppError');
const { HTTP_STATUS } = require('../../constants');
const catchAsync = require('../../utils/catchAsync');

const handleFileUploads = async (files, projectId) => {
    if (files.primary_image && files.primary_image[0]) {
        await ProjectMedia.create({
            ProjectID: projectId,
            primary_image: files.primary_image[0].buffer,
            MediaType: 'Image'
        });
    }

    if (files.additional_images) {
        const additionalImagesPromises = files.additional_images.map(file => 
            ProjectAdditionalMedia.create({
                ProjectID: projectId,
                additional_images: file.buffer,
                MediaType: 'Image'
            })
        );
        await Promise.all(additionalImagesPromises);
    }

    if (files.Video && files.Video[0]) {
        await ProjectMedia.create({
            ProjectID: projectId,
            Video: files.Video[0].buffer,
            MediaType: 'Video'
        });
    }

    if (files.Document && files.Document[0]) {
        await ProjectMedia.create({
            ProjectID: projectId,
            Document: files.Document[0].buffer,
            MediaType: 'Document'
        });
    }
};

exports.CreateProject = catchAsync(async (req, res, next) => {
    if (!req.body.ProjectName || !req.body.ClientName) {
        return next(new AppError('Project name and client name are required', HTTP_STATUS.BAD_REQUEST));
    }

    const newProject = await ProjectModel.create(req.body);
    
    if (req.files) {
        await handleFileUploads(req.files, newProject.ProjectID);
    }

    res.status(HTTP_STATUS.CREATED).json({
        success: true,
        data: newProject,
        message: 'Project created successfully'
    });
});

exports.EditProject = catchAsync(async (req, res, next) => {
    const project = await ProjectModel.findByPk(req.params.id);
    
    if (!project) {
        return next(new AppError('Project not found', HTTP_STATUS.NOT_FOUND));
    }

    await project.update(req.body);
    
    if (req.files) {
        await handleFileUploads(req.files, req.params.id);
    }

    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Project updated successfully'
    });
});