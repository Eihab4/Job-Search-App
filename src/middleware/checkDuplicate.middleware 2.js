import { User } from "../../DataBase/models/user.models.js";
import { AppError } from "../utils/AppError.utils.js";
import { catchError } from "./catchError.middleware.js";


// middleware to check if the email or phone is already in use

export const checkDuplicate = catchError(async (req, res, next) => {
    // Check if email is in req.user or req.body
    const emailToCheck = req.user.email || req.body.email;

    if (emailToCheck) {
        const user = await User.findOne({ email: emailToCheck });
        if (user) {
            return next(new AppError({ message: "Email already in use" }, 400));
        }
    }

    // Check if phone is in req.user or req.body
    const phoneToCheck = req.user.phone || req.body.phone;

    if (phoneToCheck) {
        const user = await User.findOne({ phone: phoneToCheck });
        if (user) {
            return next(new AppError({ message: "Phone already in use" }, 400));
        }
    }

    next();
});
