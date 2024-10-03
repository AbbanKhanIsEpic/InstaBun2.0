/*  Responsible for sending emails using Nodemailer. */
const nodemailer = require("nodemailer");
require("dotenv").config();

class EmailManager {
  // Function to send an email (with the verification code) -> 2 step verfication
  async auth(userEmail, code, location) {
    try {
      // Create a Nodemailer transporter using SMTP
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Define the email options
      const mailOptions = {
        from: '"InstaBun AutoMailer" <process.env.EMAIL_USER>',
        to: userEmail,
        subject: "2-Step verification Code",
        html:
          `<div>Hello <br> <br> <strong>` +
          code +
          `,
        </strong> is your 2-Step verification code. Enter the above code into the verification screen to login. This code will expire in 15 minutes.<br> <br> This request was received from <strong>
          ` +
          location +
          `,
        </strong>. <br> <br>IMPORTANT: Do not share your security codes with anyone. InstaBun will never ask you for your codes. This can include things like texting your code, screensharing, etc. By sharing your security codes with someone else, you are putting your account and its content at high risk. <br><br> Thank You,<br><br>  <strong>The InstaBun Team</strong> </div>`,
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      console.log(`Verification code email sent to ${userEmail}`);
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }
  //Function to send an email (with the verification code) -> allow user to change password
  async passwordChange(userEmail, code, location) {
    try {
      // Create a Nodemailer transporter using SMTP
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Define the email options
      const mailOptions = {
        from: '"InstaBun AutoMailer" <process.env.EMAIL_USER>',
        to: userEmail,
        subject: "Password change verification Code",
        html:
          `<div>Hello <br> <br> <strong>` +
          code +
          `,
        </strong> is your password change verification code. Enter the above code into the verification screen to change your password. This code will expire in 15 minutes.<br> <br> This request was received from <strong>
          ` +
          location +
          `,
        </strong>. <br> <br>IMPORTANT: Do not share your security codes with anyone. InstaBun will never ask you for your codes. This can include things like texting your code, screensharing, etc. By sharing your security codes with someone else, you are putting your account and its content at high risk. <br><br> Thank You,<br><br>  <strong>The InstaBun Team</strong> </div>`,
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      console.log(`Verification code email sent to ${userEmail}`);
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }
  //Function to send an email (with the verification code) -> allow user to create their account
  async createAccount(userEmail, code, location) {
    try {
      // Create a Nodemailer transporter using SMTP
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Define the email options
      const mailOptions = {
        from: '"InstaBun AutoMailer" <process.env.EMAIL_USER>',
        to: userEmail,
        subject: "Account creation verification Code",
        html:
          `<div>Hello <br> <br> <strong>` +
          code +
          `,
        </strong> is your account creation verification code. Enter the above code into the verification screen to create your account. This code will expire in 15 minutes.<br> <br> This request was received from <strong>
          ` +
          location +
          `,
        </strong>. <br> <br>IMPORTANT: Do not share your security codes with anyone. InstaBun will never ask you for your codes. This can include things like texting your code, screensharing, etc. By sharing your security codes with someone else, you are putting your account and its content at high risk. <br><br> Thank You,<br><br>  <strong>The InstaBun Team</strong> </div>`,
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      console.log(`Verification code email sent to ${userEmail}`);
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }
}

module.exports = EmailManager;
