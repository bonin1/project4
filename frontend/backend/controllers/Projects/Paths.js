const ProjectModel = require('../../models/ProjectModel');


exports.getAllProjects = async (req, res) => {
    try {

        const projects = await ProjectModel.findAll();

        if (projects.length === 0) {
            return res.status(404).json({ message: "No projects found" });
        }
        
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.getProjectById = async (req, res) => {

    const project_id = req.params.id;

    try {

        const project = await ProjectModel.findOne({ 
            where: { id: project_id } 
        });

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}