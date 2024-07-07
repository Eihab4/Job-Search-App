import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { addCompanyValidation, updateCompanyValidation } from "./company.validation.js";
import { addCompany } from "./company.controller.js";
import { checkDuplicateCompany } from "../../middleware/checkDuplicateCompany.middleware.js";
import { checkRole } from "../../middleware/checkRole.middleware.js";

export const companyRouter = Router();

companyRouter.post('/addCompany', verifyToken, checkRole, validate(addCompanyValidation), checkDuplicateCompany, addCompany)
companyRouter.put('/updateCompany/:id', verifyToken, checkRole, validate(updateCompanyValidation), checkDuplicateCompany, updateCompany)
companyRouter.delete('/deleteCompany/:id', verifyToken, checkRole, deleteCompany)
companyRouter.get('/getCompany/:id', verifyToken, checkRole, getCompany)
companyRouter.get('/getCompanyByName/:name', verifyToken, getCompanyByName)
companyRouter.get('/getAllApplicationsForSpecificJob', verifyToken, getAllApplicationsForSpecificJob)




