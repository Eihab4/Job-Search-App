import { Router } from "express";
import { hrChecker, userChecker } from "../../middleware/checkRole.middleware.js";
import { verifyToken } from "../../middleware/verifyToken.middleware.js";
import { addJobValidationSchema, updateJobValidationSchema } from "./job.validation.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { addJob, applyJob, deleteJob, getAllJobsForSpecificCompany, getAllJobsWithCompanyInfo, getAllJobsWithFilters, updateJob } from "./job.controller.js";
import { validate } from "../../middleware/validate.middleware.js";

export const jobRouter = Router();

jobRouter.post('/addJob', verifyToken, hrChecker, validate(addJobValidationSchema), addJob);
jobRouter.put('/updateJob/:id', verifyToken, hrChecker, validate(updateJobValidationSchema), updateJob);
jobRouter.delete('/deleteJob/:id', verifyToken, hrChecker, deleteJob);
jobRouter.get('/getAllJobsWithCompaniesInfo', verifyToken, getAllJobsWithCompanyInfo);
jobRouter.get('/getAllJobsForSpecificCompany/:name', verifyToken, getAllJobsForSpecificCompany);
jobRouter.get('/jobsThatMatchFilters', verifyToken, getAllJobsWithFilters);
jobRouter.post('/applyJob', verifyToken, userChecker,uploadSingleFile('userResume'), applyJob);


