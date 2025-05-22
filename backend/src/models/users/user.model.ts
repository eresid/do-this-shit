import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import { User } from "./types";
import { PaginatedModel } from "../types";
import RefreshToken from "./refreshToken.model";
import { TOKEN_CONFIG } from "../../constants/jwt.constants";
import { JWT_SECRET } from "../../constants/global.constants";

const UserSchema = new mongoose.Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.virtual("password")
  .get(function (this: any) {
    return this.hashedPassword;
  })
  .set(function (this: any, password: string) {
    this.hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
  });

UserSchema.methods.validatePassword = function (password: string) {
  return bcrypt.compareSync(password, this.hashedPassword);
};

UserSchema.methods.setPassword = function (password: string) {
  this.hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
};

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      role: this.role,
      type: TOKEN_CONFIG.ACCESS.type,
    },
    JWT_SECRET,
    { expiresIn: TOKEN_CONFIG.ACCESS.expiresIn }
  );
};

UserSchema.methods.generateRefreshToken = async function () {
  await RefreshToken.findOneAndDelete({ user: this._id });
  const newToken = await RefreshToken.create({ user: this._id });
  return jwt.sign(
    {
      tokenId: newToken._id,
      type: TOKEN_CONFIG.REFRESH.type,
    },
    JWT_SECRET,
    {
      expiresIn: TOKEN_CONFIG.REFRESH.expiresIn,
    }
  );
};

UserSchema.plugin(mongoosePaginate);

const UsersSchemaWithPagination: PaginatedModel<User> = mongoose.model<User>(
  "Users",
  UserSchema
) as PaginatedModel<User>;

export default UsersSchemaWithPagination;
