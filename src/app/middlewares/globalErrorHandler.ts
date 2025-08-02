/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { handleCastError } from "../helpers/handleCastError";
import { handleValidationError } from "../helpers/handleValidationError";
import { handleDuplicateError } from "../helpers/handleDuplicateError";
import { handleGenericError } from "../helpers/handleGenericError";
import { handleZodError } from "../helpers/handleZodError";
import { StatusCodes } from "http-status-codes";
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.name === "ZodError") {
    return handleZodError(err, res);
  }

  if (err instanceof mongoose.Error.CastError) {
    return handleCastError(err, res);
  }

  if (err instanceof mongoose.Error.ValidationError) {
    return handleValidationError(err, res);
  }

  if (err.code === 11000) {
    if (err.keyPattern?.email) {
      return res.status(StatusCodes.CONFLICT).json({
        status: false,
        message: "Email is already registered",
        error: err,
      });
    }
    // return handleDuplicateError(err, res);
  }

  if (err instanceof Error) {
    return handleGenericError(err, res);
  }

  // fallback response
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: false,
    message: "Something went wrong",
    error: err,
  });
};
