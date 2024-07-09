# Job Search App API

Welcome to the Job Search App API documentation, your gateway to a powerful system designed with MongoDB and Node.js. Our API provides a robust solution for efficiently managing users, companies, job listings, and applications. Whether you're a job seeker or an employer, our API offers seamless functionality to streamline the hiring process.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [User APIs](#user-apis)
4. [Company APIs](#company-apis)
5. [Jobs APIs](#jobs-apis)
6. [Usage Examples](#usage-examples)
7. [Contributing](#contributing)
8. [Postman Collection](#postman-collection)

---

## Introduction

Our Job Search App API facilitates user registration, job application management, and company profile handling, ensuring a seamless experience for job seekers and employers alike.

## Installation

To set up the Job Search App API locally, follow these steps:

- Clone the GitHub repository to your local machine.
- Install the necessary dependencies using npm or yarn.
- Configure the MongoDB connection in the application.
- Run the application using `npm start` or `yarn start`.

## User APIs

1. **Sign Up**
   - Register a new user account.

2. **Sign In**
   - Authenticate and log in a user using email, recoveryEmail, or mobileNumber along with password. Updates user status to online after successful sign-in.

3. **Update Account**
   - Update user account information including email, mobileNumber, recoveryEmail, DOB, lastName, and firstName. Ensure no conflicts with existing data.

4. **Delete Account**
   - Delete the user account. Only the account owner can perform this action.

5. **Get User Account Data**
   - Retrieve account data of the logged-in user.

6. **Get Profile Data for Another User**
   - Retrieve profile data for another user specified by userId.

7. **Update Password**
   - Update the password for the logged-in user.

8. **Forget Password**
   - Reset password functionality with OTP verification. Ensure data security for OTP and newPassword.

9. **Get All Accounts Associated with a Specific Recovery Email**
   - Retrieve all user accounts associated with a specified recoveryEmail.

## Company APIs

1. **Add Company**
   - Register a new company profile. Authorization required with role (Company_HR).

2. **Update Company Data**
   - Update company data. Only the company owner (Company_HR) can perform this action.

3. **Delete Company Data**
   - Delete company data. Only the company owner (Company_HR) can perform this action.

4. **Get Company Data**
   - Retrieve company data and all jobs related to this company. Authorization required with role (Company_HR).

5. **Search for a Company by Name**
   - Search for a company by name. Authorization required with roles (Company_HR and User).

6. **Get All Applications for Specific Jobs**
   - Retrieve all applications for jobs belonging to the logged-in company owner (Company_HR). Return application data with user details.

## Jobs APIs

1. **Add Job**
   - Add a new job listing. Authorization required with the role (Company_HR).

2. **Update Job**
   - Update job details. Authorization required with the role (Company_HR).

3. **Delete Job**
   - Delete a job listing. Authorization required with the role (Company_HR).

4. **Get All Jobs with Company Information**
   - Retrieve all job listings with their respective company information. Authorization required with roles (User, Company_HR).

5. **Get All Jobs for a Specific Company**
   - Retrieve all job listings for a specific company. Authorization required with roles (User, Company_HR).

6. **Get All Jobs Matching Filters**
   - Retrieve jobs that match specified filters such as workingTime, jobLocation, seniorityLevel, jobTitle, and technicalSkills. Authorization required with roles (User, Company_HR).

7. **Apply to Job**
   - Apply for a job listing, adding a new application document to the Applications collection. Authorization required with role (User).

---

## Models

### User Collection

1. **firstName**: String
2. **lastName**: String
3. **username**: String (derived from firstName and lastName)
4. **email**: String (unique)
5. **password**: String
6. **recoveryEmail**: String
7. **DOB**: Date (format: YYYY-MM-DD)
8. **mobileNumber**: String (unique)
9. **role**: String (User, Company_HR)
10. **status**: String (online, offline)

### Company Collection

1. **companyName**: String (unique)
2. **description**: String
3. **industry**: String
4. **address**: String
5. **numberOfEmployees**: String (range, e.g., 11-20 employees)
6. **companyEmail**: String (unique)
7. **companyHR**: ObjectId (reference to User Collection)

### Job Collection

1. **jobTitle**: String
2. **jobLocation**: String (onsite, remotely, hybrid)
3. **workingTime**: String (part-time, full-time)
4. **seniorityLevel**: String (Junior, Mid-Level, Senior, Team-Lead, CTO)
5. **jobDescription**: String
6. **technicalSkills**: Array of Strings
7. **softSkills**: Array of Strings
8. **addedBy**: ObjectId (reference to User Collection, Company_HR)

   
## Usage Examples

Explore and test our API endpoints using [Postman](https://documenter.getpostman.com/view/34440263/2sA3e2epGz). Detailed usage examples are provided for each API endpoint.

## Contributing

Contributions to the Job Search App API project are welcome! Please fork the repository, make improvements, and submit pull requests.

## Postman Collection

Access our complete API documentation and interact with endpoints through our [Postman Collection](https://documenter.getpostman.com/view/34440263/2sA3e2epGz).
