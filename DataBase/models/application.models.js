import { Schema, model } from "mongoose";
import { Job } from "./job.models.js";
import { User } from "./user.models.js";

// Define the application schema
const applicationSchema = new Schema({
    jobId: { type: Schema.Types.ObjectId, ref: 'Job' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    userTechSkills: { type: [String] },
    userSoftSkills: { type: [String] },
    userResume: { type: String }
});

// Middleware to modify userResume before it's initialized
applicationSchema.post('init', function () {
    this.userResume = 'http://localhost:3000/job/applyJob/' + this.userResume;
});

// Export the Application model
export const Application = model("Application", applicationSchema);