import { AppError } from "../utils/AppError.utils.js";
import { catchError } from "./catchError.middleware.js";

export const checkRole = catchError(async (req, res, next) => {
    // Check if the user role is 'hr'
    if (req.user.role === 'hr') {
        return next();
    }
    // If user role is not 'hr', throw an error
    next(new AppError('Access denied: User does not have the required role', 403));
});