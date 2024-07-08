import Joi from 'joi'

export const addCompanyValidation = Joi.object({
    companyName: Joi.string().required(),
    description: Joi.string(),
    industry: Joi.string(),
    address: Joi.string(),
    numberOfEmployees: Joi.number().integer().min(10).max(50000),
    companyEmail: Joi.string().email().required(),
    hr: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
});

export const updateCompanyValidation = Joi.object({
    id: Joi.string().required(),
    companyName: Joi.string().min(1).max(100),
    description: Joi.string().allow('').max(500),
    industry: Joi.string().min(1).max(50),
    address: Joi.string().max(200),
    numberOfEmployees: Joi.number().integer().min(10).max(50000),
});