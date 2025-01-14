const ProjectModel = require('../../models/ProjectModel');
const ProjectMedia = require('../../models/ProjectMedia');
const ProjectAdditionalMedia = require('../../models/ProjectAdditionalMedia');
const ProjectDocument = require('../../models/ProjectDocument');
const ProjectVideo = require('../../models/ProjectVideo');

const AppError = require('../../utils/AppError');
const { HTTP_STATUS } = require('../../constants');
const catchAsync = require('../../utils/catchAsync');

const handleFileUploads = async (files, projectId) => {
    try {
        if (files.primary_image && files.primary_image[0]) {
            await ProjectMedia.create({
                ProjectID: projectId,
                primary_image: files.primary_image[0].buffer
            });
        }

        if (files.additional_images) {
            const additionalImagesPromises = files.additional_images.map(file => 
                ProjectAdditionalMedia.create({
                    ProjectID: projectId,
                    additional_images: file.buffer
                })
            );
            await Promise.all(additionalImagesPromises);
        }

        if (files.Video && files.Video[0]) {
            await ProjectVideo.create({
                ProjectID: projectId,
                video: files.Video[0].buffer
            });
        }

        if (files.Document && files.Document[0]) {
            await ProjectDocument.create({
                ProjectID: projectId,
                document: files.Document[0].buffer
            });
        }
    } catch (error) {
        throw new AppError(`File upload failed: ${error.message}`, HTTP_STATUS.INTERNAL_SERVER_ERROR);
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

exports.DeleteProject = catchAsync(async (req, res, next) => {
    const project = await ProjectModel.findByPk(req.params.id);
    
    if (!project) {
        return next(new AppError('Project not found', HTTP_STATUS.NOT_FOUND));
    }

    // Delete associated media files
    await Promise.all([
        ProjectMedia.destroy({ where: { ProjectID: req.params.id } }),
        ProjectAdditionalMedia.destroy({ where: { ProjectID: req.params.id } }),
        ProjectVideo.destroy({ where: { ProjectID: req.params.id } }),
        ProjectDocument.destroy({ where: { ProjectID: req.params.id } })
    ]);

    // Delete the project
    await project.destroy();

    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Project deleted successfully'
    });
});