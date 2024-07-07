import { Schema, model } from "mongoose";
import { User } from "./user.models.js";
import { Company } from "./company.models.js";



// to not violate the SRP and OCP principles

export const jobLocationEnum = ["onSite", "remotely", "hybrid"]
export const workingTimeEnum = ["part-time", "full-time"]
export const seniorityLevelEnum=["Junior","Mid-Level","Senior","Team-Lead","CTO"]


// Schema object properties for job

const jobSchema = new Schema({
    jobTitle: { type: String },
    jobLocation: { type: String, enum: jobLocationEnum },
    workingTime: { type: String, enum: workingTimeEnum },
    jobDescription: { type: String },
    seniorityLevel: { type: String, enum: seniorityLevelEnum },
    technicalSkills: { type: [String] },
    softSkills: { type: [String] },
    addedBy: { type: Schema.Types.ObjectId, ref:Company },
    field:{type:String}
});

// Export the Job model

export const Job= model("Job",jobSchema)