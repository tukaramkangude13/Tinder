import express from "express";
import { MongoClient } from "mongodb";
import { admingauth } from "./middlewares/auth.js";
import { Usermodel } from "./models/user.js";
import { connectdb } from "./config/database.js";
import { error } from "console";
const main = express();
main.use(express.json());

 main.post("/signup",async(req,res)=>{
console.log(req.body)
const data=req.body;
    const userobject=data
        // firstName:" mahendrasingh  ",
        // lastnNme:"dhoni",
        // phoneNo:7620068689,
        // address:"ranchi",
        // age:30,
        // gender:" Male", 
        // emailId:"mahedraSingh@gmail.com"
    


const user=new Usermodel(userobject);
   await user.save();
    res.send(" signUp the please  ")


 })

//  main.get("/feed",async(req,res,next)=>{
//     next();

//     try{
//     const use=await Usermodel.find({});
//     res.send(use)
//     }catch(err){
//         res.send("Oops Something Went Wrong   1");
//     }
//     })
    main.get("/feed",async(req,res)=>{

    try{
        // const email=req.body.emailId;
console.log(req.body);
    const use=await Usermodel.exists({firstName:"   ravindra Jadeja   "})
   console.log(use);
     res.send(use)
   
    }catch(err){
        res.send("Oops Something Went Wrong 2");
    }
    })
connectdb().then(()=>{

    main.listen(7777, () => {
        console.log("Server is running on port 7777");
      });
    console.log(" database is connected ")
    }).catch(err=>{
    console.log(" failed to connected");
    })
connectdb();
console.log("Server initialization complete");
// TzpFqiqfd8enQAXS