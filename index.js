
import express from "express"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"

dotenv.config({});
connectDB();
const app = express();
// Use for checking server at browser
// app.use("/" ,(req,res)=>{
//     return res.status(200).json({
//         message:"I am from server side",
//         success:true
//     })
// })


//middlewares...
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
const corsOptions= {
    origin:"*",
    credentials:true
}
app.use(cors(corsOptions));

//for routes
app.use("/api/v1/user",userRoute)


const PORT = process.env.PORT||3000;
app.listen(PORT, ()=>{
    
    console.log(`Server running at ${PORT}`)
  
})

