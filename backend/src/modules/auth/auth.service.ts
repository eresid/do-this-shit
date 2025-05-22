import { Request, Response } from "express";
import UserModel from "../../models/users/user.model";
import { ERRORS } from "../../constants/strings.constants";
import validateFields, { JOI } from "../../utils/validation";
import Joi from "joi";
import ResponseService from "../../utils/ResponseService";

const loginValidationSchema = JOI.object({
  email: Joi.string().strict().required(),
  password: Joi.string().strict().required(),
});

class AuthService {
  async login(req: Request, res: Response): Promise<any> {
    if (await validateFields(loginValidationSchema, req, res)) return;

    try {
      const user = await UserModel.findOne({
        email: req.body.email.toLowerCase(),
      });

      if (!user || !user.validatePassword(req.body.password)) {
        return ResponseService.error(res, ERRORS.auth.wrongCredentials, 401);
      }

      const accessToken = user.generateAccessToken();
      const refreshToken = await user.generateRefreshToken();

      const { _id, email, createdAt, updatedAt } = user.toObject();

      ResponseService.success(res, {
        user: {
          _id,
          email,
          createdAt,
          updatedAt,
        },
        accessToken,
        refreshToken,
      });
    } catch (err: any) {
      ResponseService.error(res, err.message);
    }
  }

  async registration(req: Request, res: Response): Promise<any> {
    // TODO
  }

  async resetPassword(req: Request, res: Response): Promise<any> {
    // TODO
  }

  async refreshToken(req: Request, res: Response): Promise<any> {
    // TODO
  }
}

export default new AuthService();
