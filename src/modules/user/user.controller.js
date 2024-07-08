import { User } from "../../../DataBase/models/user.models.js"
import { catchError } from "../../middleware/catchError.middleware.js"
import jwt from 'jsonwebtoken'
import { AppError } from "../../utils/AppError.utils.js"
import bcrypt from "bcrypt";
import { generateOtp, otpExpiry } from "../../utils/generateOtp.utils.js";
import { sendEmail } from "../../emails/sendEmail.emails.js";


// the api for creating a new user

export const signUp = catchError(async (req, res, next) => {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    const user = await User.create(req.body);
    user.password = undefined;
    res.status(201).json({ message: 'User created successfully', user });
});


// the api for logging in an existing user

export const signIn = catchError(async (req, res, next) => {
    const { email, phone, password } = req.body;

    // Find user by email or phone
    const user = email ? await User.findOne({ email }) : await User.findOne({ phone });

    // Check if user exists and password is correct
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return next(new AppError("Invalid email or password!", 400));
    }

    // Update user status to online
    const changeStatus = { status: 'online' };
    await User.findByIdAndUpdate(user._id, { $set: changeStatus });

    // Create JWT payload
    const payload = {
        password: user.password
    };

    if (user.email) payload.email = user.email;
    if (user.phone) payload.phone = user.phone;

    // Generate token
    const token = jwt.sign(payload, 'jobSearchPrivateKey', { expiresIn: '2h' });

    // Send response
    res.status(200).json({ message: "login successfully", token });
})

// the api for updating a user's information

export const updateUser = catchError(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
    res.status(200).json({ message:'user updated successfully',user})
})

// the api for deleting a user

export const deleteUser = catchError(async (req, res, next) => {
    await User.findByIdAndDelete(req.user._id);
    res.status(204).json({ message:'user deleted successfully'})
})

// the api for getting user's data

export const getUserData = catchError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    res.status(200).json({ message:'user data',user})
})

// the api for getting another user data

export const getAnotherUserData = catchError(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
        return next(new AppError({ message: "User not found" }, 404));
    }

    // Create the public data object
    const publicData = {
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        status: user.status,
        role: user.role,
        DOB: user.DOB
    };

    res.status(200).json({ message: 'Another user data', user: publicData });
});

// the api for updating user's password

export const updatePassword = catchError(async (req, res, next) => {
    const { currentPassword, newPassword, reNewPassword } = req.body;

    // Check if new password and re-entered password match
    if (newPassword !== reNewPassword) {
        return next(new AppError({ message: "Passwords do not match" }, 400));
    }

    // Find the user by ID
    const user = await User.findById(req.user._id);
    if (!user) {
        return next(new AppError({ message: "User not found" }, 404));
    }

    // Check if current password is correct
    if (!bcrypt.compareSync(currentPassword, user.password)) {
        return next(new AppError({ message: "Current password is incorrect" }, 400));
    }

    // Update password
    const hashedPassword = bcrypt.hashSync(newPassword, 8);
    await User.findByIdAndUpdate(req.user._id, { $set: { password: hashedPassword } });

    res.status(200).json({ message: "Password updated successfully" });
});

// the api for forgot password

export const forgotPassword = catchError(async (req, res, next) => {
    const { email, phone } = req.body;

    let user;
    // Find user by email or phone based on login method
    if (req.loginMethod === 'email') {
        user = await User.findOne({ email });
    } else if (req.loginMethod === 'phone') {
        user = await User.findOne({ phone });
    }

    // Check if user exists
    if (!user) {
        return next(new AppError("User not found", 404));
    }

    // Generate OTP and expiry time
    const otp = generateOtp();
    const otpExpires = otpExpiry();

    // Update user with OTP and expiry time
    await User.findByIdAndUpdate(user._id, { $set: { otp, otpExpires } });

    // Send OTP to user's email
    sendEmail(user.email, otp);

    // Send response
    res.status(200).json({ message: "OTP sent successfully" });
});


// the api for re-setting password

export const resetPassword = catchError(async (req, res, next) => {
    const { otp, newPassword, reNewPassword } = req.body;

    // Check if new password and re-entered password match
    if (newPassword !== reNewPassword) {
        return next(new AppError("Passwords do not match", 400));
    }

    // Find user by OTP and check if OTP is valid and not expired
    const user = await User.findOne({ otp, otpExpires: { $gt: new Date() } });

    if (!user) {
        return next(new AppError("Invalid OTP or OTP expired", 400));
    }

    // Hash the new password
    const hashedPassword = bcrypt.hashSync(newPassword, 8);

    // Update password and reset OTP fields
    await User.findByIdAndUpdate(user._id, { $set: { password: hashedPassword, otp: null, otpExpires: null } });

    res.status(200).json({ message: "Password updated successfully" });
});

// the api for getting all accounts that have same recovery email

export const accountsWithSameRecoveryEmail = catchError(async (req, res, next) => {
    const { recoveryEmail } = req.body;
    
    // Find users with the same recovery email
    const users = await User.find({ recoveryEmail });

    // Check if any users were found
    if (!users.length) {
        return next(new AppError("No accounts found with this recovery email", 404));
    }

    // Send response with the list of users
    res.status(200).json({
        message: "Accounts found with the same recovery email",
        users: users.map(user => ({
            email: user.email,
            phone: user.phone,
            firstName: user.firstName,
            lastName: user.lastName,
            status: user.status,
            role: user.role
        }))
    });
});
