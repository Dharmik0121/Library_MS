export function generateVerificationOtpEmailTemplete(otpCode, name) {
  return `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee;text-align:center;">
    <img src="https://i.imghippo.com/files/JiR6488q.png" alt="" border="0" style="width:150px; height:50px; object-fit:contain; margin-bottom:10px;">      
    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600"></a>
    </div>
    <h2 style="font-size:1.1em">Hi, ${name}</h2>
    <p>"Easily explore, borrow, and manage books with BookNest – Your smart library companion!"<br/>
    OTP is valid for 15 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otpCode}</h2>
    <p style="font-size:0.9em;">Regards,<br />BookNest</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>BookNest Inc</p>
      <p>1600 Amphitheatre Parkway</p>
      <p>California</p>
    </div>
  </div>
</div>`;
}
export function generateForgotPasswordEmailTemplete(resetPasswordUrl) {
  return `
  <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
        <img src="https://i.imghippo.com/files/JiR6488q.png" alt="" border="0" style="width:150px; height:50px; object-fit:contain; margin-bottom:10px;">      
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600"></a>
    </div>
    <p>We received a request to reset your password. Click the button below to set a new password. This link is valid for only 15 minutes.</p>
    <a href="${resetPasswordUrl}" style="background: #00466a;color: #fff;padding: 10px 20px;text-decoration: none;border-radius: 4px;font-size: 1.2em;">Reset Password</a>
    <p>If you didn’t request this, you can ignore this email.</p>
    <p style="font-size:0.9em;">Regards,<br />Your BookNest Team</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>BookNest Inc</p>
      <p>1600 Amphitheatre Parkway</p>
      <p>California</p>
    </div>
  </div>
</div>`;
}
