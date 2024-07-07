import { Schema, SchemaType, model } from "mongoose";
import { User } from "./user.models.js";



// Schema object properties for company  

const companySchema = new Schema({
    companyName: { type: String, unique: true },
    description: { type: String },
    industry: { type: String },
    address: { type: String },
    numberOfEmployees: { type: Number, min: 10, max: 50000 },
    companyEmail: { type: String, unique: true },
    hr: { type: Schema.Types.ObjectId, ref: 'User' },
    availableJobs: { type: [String] }
});

// Export the Company model

export const Company = model("Company", companySchema)
