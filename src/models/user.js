import { notDeepEqual } from "assert";
import mongoose from "mongoose";
import { type } from "os";
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required:true,
  },
  lastnNme: {
    type: String,
  },
  password: {
    type: String,
required:true,
},
  address: {
    type: String,
  },
  age: {
    type: Number,
    min:18,
    
},
  gender: {
    type: String,
  },
  emailId: {
    type: String,
    
Unique:true,
    required:true,

},
});
 export const Usermodel=   mongoose.model("user",userSchema);


//  {
//     "firstName"
//     :"   ravindra Jadeja   ",
//     "lastnNme"
//     :"Jadeja",
//     "phoneNo"
//     :1,
//     "address"
//     :"ranchi",
//     "age"
//     :30,
//     "gender"
//     :" Male",
//     "emailId"
//     :"mahedraSingh@gmail.com"}