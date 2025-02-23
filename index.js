
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
// const corsOptions= {
//     origin: ["https://doctorapp-t160.onrender.com"],  // Add frontend URL
//     methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",  // Allow common HTTP methods
//     allowedHeaders: ["Content-Type", "Authorization"],  // Allow necessary headers
//     credentials: true
// };
const corsOptions = {
    origin: ["http://localhost:5173", "https://doctorapp-t160.onrender.com"],  // Allow both local & production frontend
    methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};
app.use(cors(corsOptions));


//for routes
app.use("/api/v1/user",userRoute)


const PORT = process.env.PORT||3000;
app.listen(PORT, ()=>{
    
    console.log(`Server running at ${PORT}`)
  
})

