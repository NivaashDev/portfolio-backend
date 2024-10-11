const Project = require('../models/projectModel');
const { projectSchema } = require('../validation/projectValidation'); // Import the Joi validation schema

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
};


const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project' });
  }
};  

const addProject = async (req, res) => {

  const { error } = projectSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { title, description, technologies, githubLink, imageUrl, deployedLink } = req.body;

  try {
    const project = new Project({
      title,
      description,
      technologies,
      githubLink,
      imageUrl,
      deployedLink,
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error adding project' });
  }
};


const updateProject = async (req, res) => {

  const { error } = projectSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { title, description, technologies, githubLink, imageUrl, deployedLink } = req.body;
  const { id } = req.params;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        title,
        description,
        technologies,
        githubLink,
        imageUrl,
        deployedLink,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project' });
  }
};


const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: `Project ${id} deleted` });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project' });
  }
};

module.exports = {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
};
