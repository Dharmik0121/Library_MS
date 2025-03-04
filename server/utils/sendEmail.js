import nodemailer from "nodemailer";
export const sendEmail = async ({ email, subject, message, name }) => {
  const transpoter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    service: process.env.SMTP_SERVICE,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    name,
    html: message,
  };
  await transpoter.sendMail(mailOptions);
};
