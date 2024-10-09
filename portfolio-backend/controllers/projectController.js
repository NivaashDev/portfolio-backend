
const getProjects = (req, res) => {
    res.status(200).json({ message: 'Get all projects' });
  };

const addProject = (req, res) => {
    res.status(201).json({ message: 'Project added' });
};
  
const updateProject = (req, res) => {
    res.status(200).json({ message: `Project ${req.params.id} updated` });
};

const deleteProject = (req, res) => {
    res.status(200).json({ message: `Project ${req.params.id} deleted` });
};
  
module.exports = {
    getProjects,
    addProject,
    updateProject,
    deleteProject,
};
  