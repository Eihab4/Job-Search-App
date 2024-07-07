import { Router } from "express";
import { checkRole } from "../../middleware/checkRole.middleware.js";
import { verifyToken } from "../../middleware/verifyToken.middleware.js";
import { addJobValidationSchema, applyJobValidationSchema, updateJobValidationSchema } from "./job.validation.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { addJob, applyJob, deleteJob, getAllJobsForSpecificCompany, getAllJobsWithCompanyInfo, getAllJobsWithFilters, updateJob } from "./job.controller.js";
import { validate } from "../../middleware/validate.middleware.js";

export const jobRouter = Router();

jobRouter.post('/addJob', verifyToken, checkRole, validate(addJobValidationSchema), addJob);
jobRouter.put('/updateJob/:id', verifyToken, checkRole, validate(updateJobValidationSchema), updateJob);
jobRouter.delete('/deleteJob/:id', verifyToken, checkRole, deleteJob);
jobRouter.get('/getAllJobsWithCompaniesInfo', verifyToken, getAllJobsWithCompanyInfo);
jobRouter.get('/getAllJobsForSpecificCompany/:name', verifyToken, getAllJobsForSpecificCompany);
jobRouter.get('/jobsThatMatchFilters', verifyToken, getAllJobsWithFilters);
jobRouter.post('/applyJob', verifyToken, uploadSingleFile('userResume'), validate(applyJobValidationSchema), applyJob);

export default jobRouter;
