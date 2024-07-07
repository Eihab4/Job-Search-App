import { Company } from "../../DataBase/models/company.models.js";
import { catchError } from "./catchError.middleware.js";


export const checkDuplicateCompany = catchError(async (req, res, next) => {
    // Check if company name already exists in the database
    const companyNameExists = await Company.findOne({ companyName: req.body.companyName });
    if (companyNameExists) {
        return next(new AppError("Company name already exists", 400));
    }

    // Check if company email already exists in the database
    const companyEmailExists = await Company.findOne({ companyEmail: req.body.companyEmail });
    if (companyEmailExists) {
        return next(new AppError("Company email already in use", 400));
    }

    // If neither name nor email exists, proceed to the next middleware
    next();
});

