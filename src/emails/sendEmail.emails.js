import nodemailer from "nodemailer"
import { emailHtml } from "./emailHtml.emails.js";

export const sendEmail = async(email,otp) =>{
    const transporter = nodemailer.createTransport({
   service:"gmail",
   auth: {
    user: "eihabmohamed19@gmail.com",
    pass: "eolaljqppwfvwqvd",
  },
    });
    
    const info = await transporter.sendMail({
    from: '"Job Search ✉️" <eihabmohamed19@gmail.com>',
    to: email,
    subject: "New Message ! ",
    html: emailHtml(otp),
  });
}