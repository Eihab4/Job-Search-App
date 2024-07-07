import { Router } from "express";
import { checkRole } from "../../middleware/checkRole.middleware.js";
import { verifyToken } from "../../middleware/verifyToken.middleware.js";
import { addJobValidationSchema, applyJobValidationSchema, updateJobValidationSchema } from "./job.validation.js";
import { validate } from "uuid";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";


export const applicationRouter = Router()

applicationRouter.post('/addJob', verifyToken, checkRole, validate(addJobValidationSchema), addJob)
applicationRouter.put('/updateJob/:id', verifyToken, checkRole, validate(updateJobValidationSchema), updateJob)
applicationRouter.delete('/deleteJob/:id', verifyToken, checkRole, deleteJob)
applicationRouter.get('/getAllJobsWithCompaniesInfo', verifyToken, getAllJobsWithCompanyInfo)
applicationRouter.get('/getAllJobsForSpecificCompany/:name', verifyToken, getAllJobsForSpecificCompany)
applicationRouter.get('/jobsThatMatchFilters', verifyToken, getAllJobsWithFilters);
applicationRouter.post('/applyJob', verifyToken, uploadSingleFile('userResume'), validate(applyJobValidationSchema), applyJob);

