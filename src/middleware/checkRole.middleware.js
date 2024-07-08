import { User } from "../../DataBase/models/user.models.js";
import { AppError } from "../utils/AppError.utils.js";
import { catchError } from "./catchError.middleware.js";

export const hrChecker = catchError(async (req, res, next) => {
    // Check if the user role is 'hr'
    const searcher = req.user.email || req.user.phone
    const user = await User.findOne({ searcher })
    if (user && user.role !== 'hr') return next(new AppError('Access denied: User does not have the required role', 403));
    // If user role is not 'hr', throw an error
    next();
});

export const userChecker = catchError(async (req, res, next) => {
    // Check if the user role is 'user'
    const searcher = req.user.email || req.user.phone
    const user = await User.findOne({ searcher })
    if (user && user.role !== 'user') return next(new AppError('Access denied: User does not have the required role', 403));
    // If user role is not 'user', throw an error
    next();
});
