import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies || req.headers.Authorization;
  console.log(token, req.cookies, req.headers);
  if (!token) {
    return next(new ErrorHandler("Use r Not Authorized", 401));
  }
  console.log("pp", process.env.JWT_SECRET_KEY)
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  next();
});
