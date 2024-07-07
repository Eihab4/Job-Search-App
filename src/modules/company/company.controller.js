import { Application } from "../../../DataBase/models/application.models.js";
import { Company } from "../../../DataBase/models/company.models.js";
import { Job } from "../../../DataBase/models/job.models.js";
import { catchError } from "../../middleware/catchError.middleware.js";


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

    const company = await Company.findByIdAndDelete(req.params.id)
    if (!company) {
        return next(new AppError({ message: "Company not found" }, 404));
    }
    res.status(204).json({ message: 'Company deleted successfully' })
})

// api for getting company details

export const getCompany = catchError(async (req, res, next) => {
    // Validate company ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new AppError("Invalid company ID", 400));
    }

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
    const hrId = req.user._id;

    // Find company by HR ID
    const company = await Company.findOne({ hr: hrId });
    if (!company) {
        return next(new AppError("Company not found", 404));
    }

    // Get all job IDs for the company's available jobs
    const allJobsId = company.availableJobs;

    // Find all applications for the jobs belonging to this company and populate user details
    const applications = await Application.find({ jobId: { $in: allJobsId } })
        .populate('userId', 'firstName lastName email phone');

    // Respond with the found applications including user details
    res.status(200).json({ message: 'Applications for specific job retrieved successfully', applications });
});

