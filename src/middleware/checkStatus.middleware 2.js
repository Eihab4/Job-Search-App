import { User } from "../../DataBase/models/user.models.js"
import { AppError } from "../utils/AppError.utils.js"
import { catchError } from "./catchError.middleware.js"

// middleware to check for status either online or offline

export const checkStatus = catchError(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        return next(new AppError({ message: "User not found" }, 404));
    }

    if (user.status === 'offline') {
        return next(new AppError({ message: "User is offline" }, 404));
    }

    // If everything is okay, proceed to the next middleware
    next();
});