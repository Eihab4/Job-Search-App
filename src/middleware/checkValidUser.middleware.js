import { User } from "../../DataBase/models/user.models.js";
import { catchError } from "./catchError.middleware.js";

export const checkValidUser = catchError(async (req, res, next) => {
    const { email, phone } = req.body;

    // Find user by email or phone
    const user = email ? await User.findOne({ email }) : await User.findOne({ phone });
    if (user) {
        req.user = user;
        req.loginMethod = email ? 'email' : 'phone';
        return next();
    }
    next(new Error("User not found"));
})