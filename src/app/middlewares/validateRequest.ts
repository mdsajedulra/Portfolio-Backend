
import { ZodObject } from "zod";
import catchAsync from "../utils/catchAsync";

const validateRequest = (schema: ZodObject) => {

  return catchAsync(async (req, res, next) => {
    await schema.parseAsync(req.body);
    console.log(req.body);
    next();
  });
};

export default validateRequest;
