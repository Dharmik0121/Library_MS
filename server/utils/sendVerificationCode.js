import { generateVerificationOtpEmailTemplete } from "./emailTemplete.js";
import { sendEmail } from "./sendEmail.js";

export async function sendVerificationCode(verificationCode, email, res, name) {
  try {
    const message = generateVerificationOtpEmailTemplete(
      verificationCode,
      name
    );
    sendEmail({
      email,
      subject: "Verification Code (LMS)",
      message,
    });
    res
      .status(200)
      .json({ success: true, message: "Verification code sent successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Verification code failed to send.",
    });
  }
}
