const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendEmail = async ({ to, subject, text }) => {
  try {
    await transporter.sendMail({
      from: `Inventory System <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      text,
    });
  } catch (error) {
    console.error("Email send failed:", error);
  }
};
