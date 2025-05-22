import Joi from "joi";
import { Request, Response } from "express";
import ResponseService from "./ResponseService";
import { JOI_ERRORS } from "./JoiErrors";

export const URL_REGEX = /^[a-z0-9_-]+$/;
// Minimum eight characters, at least one letter, one number and one special character:
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const JOI = Joi.defaults((schema) => schema.messages(JOI_ERRORS));

const validateFields = async (schema: Joi.ObjectSchema<any>, req: Request, res: Response) => {
  try {
    await schema.validateAsync(req.body);
    return false;
  } catch (error: any) {
    ResponseService.error(res, error.message);
    return true;
  }
};

export const validateStatusFields = async (schema: Joi.ObjectSchema<any>, body: any, res: Response) => {
  try {
    await schema.validateAsync(body);
    return false;
  } catch (error: any) {
    ResponseService.error(res, error.message);
    return true;
  }
};

export default validateFields;
