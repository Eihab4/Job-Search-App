import Joi from "joi"
import { jobLocationEnum, seniorityLevelEnum, workingTimeEnum } from "../../../DataBase/models/job.models.js";

export const addJobValidationSchema = Joi.object({
    jobTitle: Joi.string().required(),
    jobLocation: Joi.string().valid(...jobLocationEnum).required(),
    workingTime: Joi.string().valid(...workingTimeEnum).required(),
    jobDescription: Joi.string().required(),
    seniorityLevel: Joi.string().valid(...seniorityLevelEnum).required(),
    technicalSkills: Joi.array().items(Joi.string().required()).required(),
    softSkills: Joi.array().items(Joi.string().required()).required(),
    addedBy: Joi.string().hex().length(24).required(),
    field: Joi.string().required()
});

// update job schema

export const updateJobValidationSchema = Joi.object({
    jobTitle: Joi.string().min(1).max(100),
    jobLocation: Joi.string().valid(...jobLocationEnum), // Spread the array using spread operator
    workingTime: Joi.string().valid(...workingTimeEnum), // Spread the array using spread operator
    jobDescription: Joi.string(),
    seniorityLevel: Joi.string().valid(...seniorityLevelEnum), // Spread the array using spread operator
    technicalSkills: Joi.array().items(Joi.string()),
    softSkills: Joi.array().items(Joi.string()),
    field: Joi.string(),
    id: Joi.string().required(),
});

// apply job schema

export const applyJobValidationSchema = Joi.object({
    jobId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    userId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    userTechSkills: Joi.array().items(Joi.string()).required(),
    userSoftSkills: Joi.array().items(Joi.string()).required(),
    userResume: Joi.string().required()
});
