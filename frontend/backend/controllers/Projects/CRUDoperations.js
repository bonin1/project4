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
        const uploadPromises = [];

        if (files.primary_image && files.primary_image[0]) {
            const existingImage = await ProjectMedia.findOne({
                where: { ProjectID: projectId }
            });
            
            if (existingImage) {
                uploadPromises.push(
                    existingImage.update({
                        primary_image: files.primary_image[0].buffer
                    })
                );
            } else {
                uploadPromises.push(
                    ProjectMedia.create({
                        ProjectID: projectId,
                        primary_image: files.primary_image[0].buffer
                    })
                );
            }
        }

        if (files.additional_images) {
            await ProjectAdditionalMedia.destroy({
                where: { ProjectID: projectId }
            });
            
            const additionalImagesPromises = files.additional_images.map(file => 
                ProjectAdditionalMedia.create({
                    ProjectID: projectId,
                    additional_images: file.buffer
                })
            );
            uploadPromises.push(...additionalImagesPromises);
        }

        if (files.Video && files.Video[0]) {
            uploadPromises.push(
                ProjectVideo.create({
                    ProjectID: projectId,
                    video: files.Video[0].buffer,
                    videoType: files.Video[0].mimetype
                })
            );
        }

        if (files.Document && files.Document[0]) {
            uploadPromises.push(
                ProjectDocument.create({
                    ProjectID: projectId,
                    document: files.Document[0].buffer,
                    documentType: files.Document[0].mimetype,
                    documentName: files.Document[0].originalname
                })
            );
        }

        await Promise.all(uploadPromises);
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

    await Promise.all([
        ProjectMedia.destroy({ where: { ProjectID: req.params.id } }),
        ProjectAdditionalMedia.destroy({ where: { ProjectID: req.params.id } }),
        ProjectVideo.destroy({ where: { ProjectID: req.params.id } }),
        ProjectDocument.destroy({ where: { ProjectID: req.params.id } })
    ]);

    await project.destroy();

    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Project deleted successfully'
    });
});