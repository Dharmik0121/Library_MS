export const sendToken = (user, statusCode, message, res) => {
  const token = user.generateToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      secure: true, // ✅ required for HTTPS (Render)
      sameSite: "None", // ✅ required for cross-origin cookies
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
    })
    .json({
      success: true,
      user,
      message,
      token,
    });
};
