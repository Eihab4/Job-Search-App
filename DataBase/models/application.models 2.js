import { Schema, SchemaType, model } from "mongoose";
import { Job } from "./job.models.js";
import { User } from "./user.models.js";

// Schema object properties for application

const applicationSchema = new Schema({
    jobId: { type: Schema.Types.ObjectId, ref: Job },
    userId:{ type: Schema.Types.ObjectId, ref:User},
    userTechSkills: { type: [String] },
    userSoftSkills: { type: [String] },
    userResume: { type:String }
})

// Export the Application model

export const Application = model("Application", applicationSchema)