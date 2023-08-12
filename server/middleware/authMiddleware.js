import { verify } from "jsonwebtoken";
import User from "../models/User";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "./catchAsyncErrors";

export const authGuard = catchAsyncErrors(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
 
      const token = req.headers.authorization.split(" ")[1];
      const { id } = verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(id).select("-password");
      next();
  } else {
    return next(new ErrorHandler("Not authorized, No token", 401));
  }
});

export const adminGuard = (req, res, next) => {
  if (req.user && req.user.admin) {
    next();
  } else {
    return next(new ErrorHandler("Not authorized as an admn",401));
  }
};
