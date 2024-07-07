import { Application } from "../../../DataBase/models/application.models.js";
import { Company } from "../../../DataBase/models/company.models.js";
import { Job } from "../../../DataBase/models/job.models.js";
import { User } from "../../../DataBase/models/user.models.js";
import { catchError } from "../../middleware/catchError.middleware.js";
import { AppError } from '../../utils/AppError.utils.js'; // Assuming this is where AppError is defined

// API for adding a job
export const addJob = catchError(async (req, res, next) => {
    const job = await Job.create(req.body); // Use create instead of insertMany for single document
    res.status(201).json({ message: "Job added successfully", data: job });
});

// API for updating a job
export const updateJob = catchError(async (req, res, next) => {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJob) {
        return next(new AppError("Job not found", 404));
    }
    res.status(200).json({ message: "Job updated successfully", data: updatedJob });
});

// API for deleting a job
export const deleteJob = catchError(async (req, res, next) => {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
        return next(new AppError("Job not found", 404));
    }
    res.status(204).json({ message: "Job deleted successfully" });
});

// API for getting all jobs with company info
export const getAllJobsWithCompanyInfo = catchError(async (req, res, next) => {
    const jobs = await Job.find().populate('addedBy', 'companyName description industry address numberOfEmployees companyEmail');
    if (!jobs.length) {
        return next(new AppError("No jobs found", 404));
    }
    res.status(200).json({ jobs });
});

// API for getting all jobs for a specific company
export const getAllJobsForSpecificCompany = catchError(async (req, res, next) => {
    const companyName = req.params.name;
    const company = await Company.findOne({ companyName });
    if (!company) {
        return next(new AppError("Company not found", 404));
    }
    const jobs = await Job.find({ addedBy: company._id });
    res.status(200).json({ message: "Jobs for specific company", jobs });
});

// API for getting all jobs that match filters
export const getAllJobsWithFilters = catchError(async (req, res, next) => {
    const { workingTime, jobLocation, seniorityLevel, jobTitle, technicalSkills } = req.query;
    const filters = {};

    // Apply filters based on query parameters
    if (workingTime) filters.workingTime = workingTime;
    if (jobLocation) filters.jobLocation = jobLocation;
    if (seniorityLevel) filters.seniorityLevel = seniorityLevel;
    if (jobTitle) filters.jobTitle = jobTitle;
    if (technicalSkills) filters.technicalSkills = { $in: technicalSkills.split(',') };

    const jobs = await Job.find(filters).populate('addedBy', 'companyName description industry address numberOfEmployees companyEmail');
    res.status(200).json({ message: "Jobs that match filters", jobs });
});

// API for applying on a job
export const applyJob = catchError(async (req, res, next) => {
    const { jobId, userId, userTechSkills, userSoftSkills } = req.body;
    const userResume = req.file.path; // Assuming you handle file uploads correctly

    // Check if the job and user exist
    const job = await Job.findById(jobId);
    if (!job) {
        return next(new AppError("Job not found", 404));
    }
    const user = await User.findById(userId);
    if (!user) {
        return next(new AppError("User not found", 404));
    }

    // Create a new application
    const application = await Application.create({
        jobId,
        userId,
        userTechSkills,
        userSoftSkills,
        userResume
    });

    res.status(200).json({ message: "Job applied successfully", application });
});
