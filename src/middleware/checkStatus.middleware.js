import { User } from "../../DataBase/models/user.models.js"
import { AppError } from "../utils/AppError.utils.js"
import { catchError } from "./catchError.middleware.js"

// middleware to check for status either online or offline

export const checkStatus = catchError(async (req, res, next) => {
    // Ensure req.user exists and has either email or phone
    if (!req.user || (!req.user.email && !req.user.phone)) {
        return next(new AppError("User not authenticated properly", 401));
    }

    // Find user based on email or phone
    const user = await User.findOne({
        $or: [
            { email: req.user.email },
            { phone: req.user.phone }
        ]
    });

    if (!user) {
        return next(new AppError("User not found", 404));
    }

    if (user.status === 'offline') {
        return next(new AppError("User is offline", 401));
    }

    // Attach user to request object for later use if needed
    req.user = user;

    // If everything is okay, proceed to the next middleware
    next();
});
