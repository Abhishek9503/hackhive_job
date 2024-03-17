import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {

    let { token } = req.cookies;
    const headers = req.headers;
    const auth = headers.authorization;

  if(!token) token = auth;
  console.log(token, req.cookies, auth);
  // token |= auth;
  if (!token) {
    return next(new ErrorHandler("Use r Not Authorized", 401));
  }
  console.log("pp", process.env.JWT_SECRET_KEY);
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  next();
});
