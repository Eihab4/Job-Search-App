import { User } from "../../DataBase/models/user.models.js";
import { AppError } from "../utils/AppError.utils.js";
import { catchError } from "./catchError.middleware.js";

// Middleware to check if the email or phone is already in use
export const checkDuplicate = catchError(async (req, res, next) => {
    // Extract email and phone from req.body
    const { email, phone } = req.body;

    // Check for duplicate email
    if (email) {
        const userWithEmail = await User.findOne({ email });
        if (userWithEmail) {
            return next(new AppError("Email already in use", 400));
        }
    }

    // Check for duplicate phone
    if (phone) {
        const userWithPhone = await User.findOne({ phone });
        if (userWithPhone) {
            return next(new AppError("Phone already in use", 400));
        }
    }

    next(); // Proceed to the next middleware if no duplicates found
});