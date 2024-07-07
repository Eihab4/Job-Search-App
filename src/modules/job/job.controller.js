import { Company } from "../../../DataBase/models/company.models.js";
import { Job } from "../../../DataBase/models/job.models.js";
import { User } from "../../../DataBase/models/user.models.js";
import { catchError } from "../../middleware/catchError.middleware.js";


// the api for adding a job
export const addJob = catchError(async (req, res, next) => {
    const job = await Job.insertMany(req.body)
    res.status(201).json({ message: "Jobs applied successfully", data: job });
})

// the api for updating a job

export const updateJob = catchError(async (req, res, next) => {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Job updated successfully", data: updatedJob });
});

// the api for deleting a job

export const deleteJob = catchError(async (req, res, next) => {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
        return next(new AppError({ message: "Job not found" }, 404));
    }
    res.status(204).json({ message: "Job deleted successfully" });
});

// the api for getting all jobs with company info

export const getAllJobsWithCompanyInfo = catchError(async (req, res, next) => {
    // Fetch all jobs and populate the company information
    const jobs = await Job.find().populate('addedBy', 'companyName description industry address numberOfEmployees companyEmail');

    // Check if no jobs are found
    if (!jobs.length) {
        return next(new AppError("No jobs found", 404));
    }

    // Send the jobs with populated company information
    res.status(200).json({ jobs });
});

// the api for getting all jobs for a specific company

export const getAllJobsForSpecificCompany = catchError(async (req, res, next) => {
    const companyName = req.params.name;
    const company = await Company.findOne({ companyName });
    if (!company) {
        return next(new AppError({ message: "Company not found" }, 404));
    }
    const jobs = await Job.find({ addedBy: company._id });
    res.status(200).json({ message:"all jobs",jobs });
})

export const getAllJobsWithFilters= catchError(async (req, res) => {
    const { workingTime, jobLocation, seniorityLevel, jobTitle, technicalSkills } = req.query;
    const filters = {};

    // Apply filters based on query parameters
    if (workingTime) filters.workingTime = workingTime;
    if (jobLocation) filters.jobLocation = jobLocation;
    if (seniorityLevel) filters.seniorityLevel = seniorityLevel;
    if (jobTitle) filters.jobTitle = jobTitle;
    if (technicalSkills) filters.technicalSkills = { $in: technicalSkills.split(',') };

    // Find jobs that match the filters and populate company information
    const jobs = await Job.find(filters).populate('addedBy', 'companyName description industry address numberOfEmployees companyEmail');

    // Return the matching jobs
    res.status(200).json({ message: 'Jobs that match filters', jobs });
})

// the api for applying on a job

export const applyJob = catchError(async (req, res, next) => {
    const { jobId, userId, userTechSkills, userSoftSkills } = req.body;
    const userResume = req.file.path; // get the uploaded file path

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

    // Send a success message
    res.status(200).json({ message: "Job applied successfully", application });
});
