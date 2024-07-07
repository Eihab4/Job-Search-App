import { AppError } from "../utils/AppError.utils.js";

export const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate({ ...req.body, ...req.params }, { abortEarly: false });

        if (!error) {
            next(); // Proceed to the next middleware
        } else {
            const errorMessagesArray = error.details.map(err => err.message);
            next(new AppError(errorMessagesArray.join(', '), 401)); // Join messages into a single string if needed
        }
    };
};
