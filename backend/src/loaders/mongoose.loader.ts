import mongoose from "mongoose";
import { MONGODB_URL } from "../constants/global.constants";

export default () => {
  mongoose.connect(MONGODB_URL).then(() => {
    console.log("[*] MongoDB database is connected");
  });
};
