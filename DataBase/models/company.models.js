import { Schema, SchemaType, model } from "mongoose";
import { User } from "./user.models.js";



// Schema object properties for company  

const companySchema = new Schema({
    companyName: { type: "string", unique: "true" },
    description: { type: "string" },
    industry: { type: "string" },
    address: { type: "string" },
    numberOfEmployees: { type: "integer", min: [10], max: [50000] },
    companyEmail: { type: "string", unique: true },
    hr: { type: Schema.Types.ObjectId, ref: User },
    availableJobs:{type:[String]}
    
})

// Export the Company model

export const Company = model("Company", companySchema)
