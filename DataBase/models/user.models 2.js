import { model, Schema } from "mongoose";

// to not violate the SRP and OCP principles

export const statusEnum = ['offline', 'online'];
export const roleEnum = ['user', 'hr'];

// Schema object properties for user 

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fullName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    recoveryEmail: { type: String },
    status: { type: String, enum: statusEnum, default: 'offline' },
    role: { type: String, enum: roleEnum, default: 'hr' },
    DOB: { type: Date, default: Date.now },
    otp: { type: String },
    otpExpires: { type: Date }
});

// Pre-save hook to set the full name of the user
userSchema.pre('save', function (next) {
    this.fullName = `${this.firstName} ${this.lastName}`;
    next();
});

// Export the User model
export const User = model('User', userSchema)
