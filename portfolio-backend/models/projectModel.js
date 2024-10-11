// models/projectModel.js
const mongoose = require('mongoose');

// Custom URL validation function
const urlValidator = (url) => {
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
  return urlRegex.test(url);
};

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Title is required
    },
    description: {
      type: String,
      required: true, // Description is required
    },
    technologies: {
      type: [String],
      required: true, // Technologies are required
      validate: {
        validator: (array) => array.length > 0,
        message: 'At least one technology is required',
      },
    },
    githubLink: {
      type: String,
      required: true, // GitHub link is required
      validate: {
        validator: urlValidator,
        message: 'Please enter a valid GitHub URL',
      },
    },
    imageUrl: {
      type: String,
      validate: {
        validator: (url) => !url || urlValidator(url), // Image URL is optional
        message: 'Please enter a valid image URL',
      },
    },
  },
  {
    timestamps: true, // Automatically create createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Project', projectSchema);
