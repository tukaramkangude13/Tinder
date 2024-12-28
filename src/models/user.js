import mongoose from "mongoose";
import { type } from "os";
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastnNme: {
    type: String,
  },
  phoneNo: {
    type: Number,
  },
  address: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  emailId: {
    type: String,
  },
});
 export const Usermodel=   mongoose.model("user",userSchema);
