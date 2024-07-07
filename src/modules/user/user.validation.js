import Joi from "joi"
import { roleEnum, statusEnum } from "../../../DataBase/models/user.models.js"

// Joi schema for validating the signup status

export const signUpValidation = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[A-Z][A-Za-z0-9]{8,40}$')).required(),
    rePassword: Joi.string().valid(Joi.ref('password')).required(),
    phone: Joi.string().pattern(/^01[0-2,5]{1}[0-9]{8}$/).required(),
    recoveryEmail: Joi.string().email().required(),
    DOB: Joi.date().required(),
    status: Joi.string().valid(...statusEnum).required(),
    role: Joi.string().valid(...roleEnum).required()
});
// Joi schema for validating the signIn status

export const signInValidation = Joi.object({
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^01[0-2,5]{1}[0-9]{8}$/),
    password: Joi.string().pattern(new RegExp('^[A-Z][A-Za-z0-9]{8,40}$')).required(),
}).xor('email', 'phone')

// joi schema for validating the update status

export const updateValidation = Joi.object({
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^01[0-2,5]{1}[0-9]{8}$/),
    recoveryEmail: Joi.string().email(),
    DOB: Joi.date(),
    firstName: Joi.string().min(2).max(50),
    lastName: Joi.string().min(2).max(50)
}).options({ presence: "optional" })

// Joi schema for validating the update password

export const updatePasswordValidation = Joi.object({
    currentPassword: Joi.string().pattern(new RegExp('^[A-Z][A-Za-z0-9]{8,40}$')).required(),
    newPassword: Joi.string().pattern(new RegExp('^[A-Z][A-Za-z0-9]{8,40}$')).required(),
    reNewPassword: Joi.valid(Joi.ref('newPassword')).required()
})

// Joi schema for validating the new password

export const resetPasswordValidation = Joi.object({
    otp: Joi.string().length(6).required(),
    newPassword: Joi.string().pattern(new RegExp('^[A-Z][A-Za-z0-9]{8,40}$')).required(),
    reNewPassword: Joi.valid(Joi.ref('newPassword')).required()
})

// joi schema for validating the recovery emails

export const recoveryEmailValidation = Joi.object({
    recoveryEmail: Joi.string().email().required()
})








