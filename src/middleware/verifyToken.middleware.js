
import jwt from 'jsonwebtoken'
import { AppError } from '../utils/AppError.utils.js';
import { catchError } from './catchError.middleware.js';

export const verifyToken = catchError((req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new AppError("Unauthorized", 401));
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, "jobSearchPrivateKey", (err, decoded) => {
        if (err) {
            return next(new AppError("Invalid token", 401));
        }
        req.user = decoded; // Set decoded user information to req.user
        next();
    });
});