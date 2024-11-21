import nodemailer from 'nodemailer';
import crypto from 'crypto';  // For generating the reset token
import { config } from 'dotenv';
config();
// Create the transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL, // Your Gmail address
    pass: process.env.SMTP_PASS   // Your Gmail password or app-specific password
  }
});

// Function to send "Forgot Password" email
const sendForgotPasswordEmail = async (user) => {

  const resetToken = crypto.randomBytes(20).toString('hex');


  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes
  await user.save();
  const resetUrl = `${process.env.FRONTEND_HOST}/password/reset/${resetToken}`;


  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: user.email,
    subject: "Ecommerce Password Recovery",
    text: `Hello,
    We received a request to reset your password. Please click the link below to reset your password:
    [Reset Your Password](${resetUrl})
    If you did not request a password reset, please ignore this email. This link will expire in 10 minutes for security reasons.

   Thank you,
   Ecommerce-Wala
`
  };


  await transporter.sendMail(mailOptions);
};

export { sendForgotPasswordEmail };
