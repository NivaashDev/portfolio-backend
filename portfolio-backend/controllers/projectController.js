const Project = require('../models/projectModel');

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
};

const addProject = async (req, res) => {
  const { title, description, technologies, githubLink, imageUrl } = req.body;

  if (!title || !description || !technologies) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const project = new Project({
      title,
      description,
      technologies,
      githubLink,
      imageUrl,
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error adding project' });
  }
};

const updateProject = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated project after the update
    });

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
