import multer from "multer"
import{ v4 as uuidv4}from "uuid"
import { AppError } from "../utils/AppError.utils.js";

export const uploadSingleFile = (fieldName) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            const uniqueFilename = uuidv4() + '-' + file.originalname;
            cb(null, uniqueFilename);
        }
    });

    // File filter function
    const fileFilter = (req, file, cb) => {
        // Accept only PDF files using startsWith
        if (file.mimetype.startsWith('application/pdf')) {
            cb(null, true);
        } else {
            cb(new AppError('Only PDF files are allowed!',401), false);
        }
    }
    const upload = multer({
        storage, fileFilter,
        limits: { fileSize: 1024 * 1024 * 5 } // 5MB
    })
    return upload.single(fieldName)
}