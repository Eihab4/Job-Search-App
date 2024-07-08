import { Application } from "../../../DataBase/models/application.models.js";
import { Company } from "../../../DataBase/models/company.models.js";
import { Job } from "../../../DataBase/models/job.models.js";
import { catchError } from "../../middleware/catchError.middleware.js";
import { AppError } from "../../utils/AppError.utils.js";


// api for adding a company
export const addCompany = catchError(async (req, res, next) => {
    // Create a new company document
    const company = await Company.create(req.body);

    // Respond with a success message
    res.status(201).json({ message: 'Company added successfully', company });
});

// the api for updating a company
export const updateCompany = catchError(async (req, res, next) => {
    // Find and update the company document
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Respond with a success message
    res.status(200).json({ message: 'Company updated successfully', updatedCompany });
})

// the api for deleting a company


export const deleteCompany = catchError(async (req, res, next) => {
    // Find the company by ID
    const company = await Company.findById(req.params.id);
    
    if (!company) {
        return next(new AppError("Company not found", 404));
    }

    // Find all jobs added by the HR of this company
    const jobs = await Job.find({ addedBy: company.hr });

    // Delete all job applications related to these jobs
    const jobIds = jobs.map(job => job._id);
    await Application.deleteMany({ jobId: { $in: jobIds } });

    // Delete all jobs added by the HR of this company
    await Job.deleteMany({ addedBy: company.hr });

    // Delete the company itself
    await Company.findByIdAndDelete(req.params.id);

    res.status(204).json({ message: 'Company deleted successfully' });
});

// api for getting company details

export const getCompany = catchError(async (req, res, next) => {  

    // Find company by ID
    const company = await Company.findById(req.params.id);
    
    // Check if company exists
    if (!company) {
        return next(new AppError("Company not found", 404));
    }
    
    // Find jobs related to the company's industry
    const jobs = await Job.find({ field: company.industry });

    // Respond with company details and related jobs
    res.status(200).json({ message: 'Company details', company, jobs });
});


// api for getting company by name

export const getCompanyByName = catchError(async (req, res, next) => {
    // Find company by name
    const company = await Company.findOne({ companyName: req.params.name });

    // Check if company exists
    if (!company) {
        return next(new AppError("Company not found", 404));
    }

    // Find jobs related to the company's industry
    const jobs = await Job.find({ field: company.industry });

    // Respond with company details and related jobs
    res.status(200).json({ message: 'Company details', company, jobs });
});

// api to get All Applications For Specific Job

export const getAllApplicationsForSpecificJob = catchError(async (req, res, next) => {
    const companyId = req.params.id; // Assuming companyId is passed in req.params.id

    // Find company by ID
    const company = await Company.findById(companyId);
    if (!company) {
        return next(new AppError("Company not found", 404));
    }

    // Find jobs associated with the company and added by the company's HR
    const jobs = await Job.find({ field: company.industry, addedBy: company.hr }); // Ensure jobs are created by company's HR

    // Get job IDs for all jobs associated with the company
    const jobIds = jobs.map(job => job._id);

    // Find applications for these jobs and populate user details
    const applications = await Application.find({ jobId: { $in: jobIds } })
        .populate('userId', 'firstName lastName email phone');

    // Respond with the found applications including user details
    res.status(200).json({ message: 'Applications for specific jobs retrieved successfully', applications });
});

