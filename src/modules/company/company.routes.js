import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { addCompanyValidation, updateCompanyValidation } from "./company.validation.js";
import { addCompany, deleteCompany, getAllApplicationsForSpecificJob, getCompany, getCompanyByName, updateCompany } from "./company.controller.js";
import { checkDuplicateCompany } from "../../middleware/checkDuplicateCompany.middleware.js";
import { hrChecker } from "../../middleware/checkRole.middleware.js";

export const companyRouter = Router();

companyRouter.post('/addCompany', verifyToken, hrChecker, validate(addCompanyValidation), checkDuplicateCompany, addCompany)
companyRouter.put('/updateCompany/:id', verifyToken, hrChecker, validate(updateCompanyValidation), checkDuplicateCompany, updateCompany)
companyRouter.delete('/deleteCompany/:id', verifyToken, hrChecker, deleteCompany)
companyRouter.get('/getCompany/:id', verifyToken, hrChecker, getCompany)
companyRouter.get('/getCompanyByName/:name', verifyToken, getCompanyByName)
companyRouter.get('/getAllApplicationsForSpecificJob/:id', verifyToken, getAllApplicationsForSpecificJob)




