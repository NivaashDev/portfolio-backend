const Joi = require('joi');

// Define the schema for project validation
const projectSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.base': 'Title must be a string',
      'string.empty': 'Title cannot be empty',
      'string.min': 'Title must be at least 3 characters long',
      'string.max': 'Title cannot exceed 100 characters',
      'any.required': 'Title is required',
    }),
  description: Joi.string()
    .min(10)
    .max(1000)
    .required()
    .messages({
      'string.base': 'Description must be a string',
      'string.empty': 'Description cannot be empty',
      'string.min': 'Description must be at least 10 characters long',
      'string.max': 'Description cannot exceed 1000 characters',
      'any.required': 'Description is required',
    }),
  technologies: Joi.array()
    .items(Joi.string())
    .min(1)
    .required()
    .messages({
      'array.base': 'Technologies must be an array',
      'array.min': 'At least one technology is required',
      'any.required': 'Technologies are required',
    }),
  githubLink: Joi.string()
    .uri()
    .required()
    .messages({
      'string.base': 'GitHub link must be a string',
      'string.empty': 'GitHub link cannot be empty',
      'string.uri': 'Please enter a valid GitHub URL',
      'any.required': 'GitHub link is required',
    }),
  imageUrl: Joi.string()
    .uri()
    .optional()
    .messages({
      'string.base': 'Image URL must be a string',
      'string.uri': 'Please enter a valid image URL',
    }),
});

module.exports = projectSchema;
