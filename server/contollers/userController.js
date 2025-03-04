import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { User } from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";

export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({ accountVerified: true });
  res.status(200).json({ success: true, users });
});

// export const registerNewAdmin = catchAsyncErrors(async (req, res, next) => {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return next(new ErrorHandler("Please upload a profile picture", 400));
//   }
//   const { name, email, password } = req.body;
//   //check if condition for name email and password
//   if (!name || !email || !password) {
//     return next(new ErrorHandler("Please fill in all fields", 400));
//   }
//   //check if user already exists
//   const isRegistered = await User.findOne({ email, accountVerified: true });
//   if (isRegistered) {
//     return next(new ErrorHandler("User already exists", 400));
//   }
//   if (password.length < 8 || password.length > 16) {
//     return next(
//       new ErrorHandler("Password must be between 8 and 16 characters", 400)
//     );
//   }
//   const { avatar } = req.files;
//   const allowedFormate = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
//   if (!allowedFormate.includes(avatar.mimetype)) {
//     return next(new ErrorHandler("Please upload a valid image", 400));
//   }
//   const hashPassword = await bcrypt.hash(password, 10);
//   const cloudinaryResponse = cloudinary.uploader.upload(avatar.tempFilePath, {
//     folder: "LMS",
//   });
//   if (!cloudinaryResponse || cloudinaryResponse.error) {
//     console.error(
//       "Cloudinary error : ",
//       cloudinaryResponse.error || "Unkonwn error"
//     );
//     return next(new ErrorHandler("Failed to upload profile picture", 400));
//   }
//   const user = await User.create({
//     name,
//     email,
//     password: hashPassword,
//     role: "Admin",
//     accountVerified: true,
//     avatar: {
//       public_id: cloudinaryResponse.public_id,
//       url: cloudinaryResponse.secure_url,
//     },
//   });
//   res
//     .status(201)
//     .json({ success: true, message: "Amin register successfully", admin });
// });

export const registerNewAdmin = catchAsyncErrors(async (req, res, next) => {
  console.log("Received files:", req.files); // Debugging
  console.log("Received body:", req.body);

  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Please upload a profile picture", 400));
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please fill in all fields", 400));
  }

  const isRegistered = await User.findOne({ email, accountVerified: true });
  if (isRegistered) {
    return next(new ErrorHandler("User already exists", 400));
  }

  if (password.length < 8 || password.length > 16) {
    return next(
      new ErrorHandler("Password must be between 8 and 16 characters", 400)
    );
  }

  const { avatar } = req.files;

  const allowedFormats = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  if (!allowedFormats.includes(avatar.mimetype)) {
    return next(new ErrorHandler("Please upload a valid image", 400));
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const cloudinaryResponse = await cloudinary.uploader.upload(
    avatar.tempFilePath,
    {
      folder: "LMS",
    }
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary error:",
      cloudinaryResponse.error || "Unknown error"
    );
    return next(new ErrorHandler("Failed to upload profile picture", 400));
  }

  const admin = await User.create({
    name,
    email,
    password: hashPassword,
    role: "Admin",
    accountVerified: true,
    avatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res
    .status(201)
    .json({ success: true, message: "Admin registered successfully", admin });
});
