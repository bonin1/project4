const ProjectModel = require('../../models/ProjectModel');
const ProjectMedia = require('../../models/ProjectMedia');
const ProjectAdditionalMedia = require('../../models/ProjectAdditionalMedia');
const ProjectVideo = require('../../models/ProjectVideo');
const ProjectDocument = require('../../models/ProjectDocument');
const { base } = require('framer-motion/client');

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await ProjectModel.findAll();

        const projectsWithMedia = await Promise.all(projects.map(async project => {
            const projectMedia = await ProjectMedia.findOne({ 
                where: { ProjectID: project.ProjectID }
            });

            const primaryImage = projectMedia?.primary_image 
                ? `data:image/jpeg;base64,${projectMedia.primary_image.toString('base64')}`
                : null;

            const projectAdditionalMedia = await ProjectAdditionalMedia.findAll({ 
                where: { ProjectID: project.ProjectID } 
            });

            const additionalImages = projectAdditionalMedia.map(img => ({
                base64Image: `data:image/jpeg;base64,${Buffer.from(img.additional_images).toString('base64')}`
            }));

            return {
                ...project.toJSON(),
                primary_image: primaryImage,
                additional_images: additionalImages,
            };
        }));

        if (projectsWithMedia.length === 0) {
            return res.status(404).json({ message: "No projects found" });
        }
        
        res.status(200).json(projectsWithMedia);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getProjectById = async (req, res) => {
    const project_id = req.params.id;

    try {
        const project = await ProjectModel.findOne({ 
            where: { ProjectID: project_id } 
        });

        if (!project) {
            return res.status(404).json({ 
                success: false, 
                error: "Project not found" 
            });
        }

        const projectMedia = await ProjectMedia.findOne({ 
            where: { ProjectID: project.ProjectID } 
        });
        const projectAdditionalMedia = await ProjectAdditionalMedia.findAll({ 
            where: { ProjectID: project.ProjectID } 
        });
        const projectVideos = await ProjectVideo.findAll({ 
            where: { ProjectID: project.ProjectID } 
        });
        const projectDocuments = await ProjectDocument.findAll({ 
            where: { ProjectID: project.ProjectID }
        });

        const primaryImage = projectMedia?.primary_image 
            ? `data:image/jpeg;base64,${projectMedia.primary_image?.toString('base64')}`
            : null;

        const additionalImages = projectAdditionalMedia.map(img => ({
            base64Image: `data:image/jpeg;base64,${Buffer.from(img.additional_images).toString('base64')}`
        }));

        const projectVideosWithBase64 = projectVideos.map(video => ({
            video: video.video ? `data:video/mp4;base64,${video.video.toString('base64')}` : null
        })).filter(v => v.video !== null);

        const projectDocumentsWithBase64 = projectDocuments.map(doc => ({
            document: doc.document ? `data:application/pdf;base64,${doc.document.toString('base64')}` : null
        })).filter(d => d.document !== null);

        const projectWithMedia = {
            ...project.toJSON(),
            primary_image: primaryImage || null,
            additional_images: additionalImages || [],
            videos: projectVideosWithBase64,
            documents: projectDocumentsWithBase64,
        };
        res.status(200).json(projectWithMedia);

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
}