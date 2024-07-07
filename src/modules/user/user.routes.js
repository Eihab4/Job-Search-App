import { Router } from "express";
import { validate } from "../../middleware/validate.middleware.js";
import { forgotPasswordValidation, recoveryEmailValidation, signInValidation, signUpValidation, updatePasswordValidation, updateValidation } from "./user.validation.js";
import { checkDuplicate } from "../../middleware/checkDuplicate.middleware.js";
import { accountsWithSameRecoveryEmail, deleteUser, forgotPassword, getAnotherUserData, getUserData, resetPassword, signIn, signUp, updatePassword, updateUser } from "./user.controller.js";
import { checkValidUser } from "../../middleware/checkValidUser.middleware.js";


export const userRouter = Router();


userRouter.post('/signUp', validate(signUpValidation), checkDuplicate, signUp)
userRouter.post('/signIn', validate(signInValidation), signIn)
userRouter.put('/update',verifyToken,checkStatus,validate(updateValidation),checkDuplicate,updateUser)
userRouter.delete('/delete', verifyToken, checkStatus, deleteUser)
userRouter.get('/userData', verifyToken, checkStatus, getUserData)
userRouter.get('/anotherUserData/:id', verifyToken, checkStatus, getAnotherUserData)
userRouter.put('/updatePassword', verifyToken, checkStatus, validate(updatePasswordValidation), updatePassword)
userRouter.post('/forgotPassword', validate(forgotPasswordValidation), checkValidUser, forgotPassword)
userRouter.post('/resetPassword', validate(resetPasswordValidation), resetPassword)
userRouter.post('/accountsWithSameRecoveryEmail', validate(recoveryEmailValidation), accountsWithSameRecoveryEmail);
