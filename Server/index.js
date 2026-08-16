import express from "express"
import dotenv from "dotenv"; 
dotenv.config();
import connectDB from "./Configs/ConnectDB.js";
import authRouter from "./Routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from "./Routes/user.routes.js";
import assistantRouter from "./Routes/assistant.route.js";
import billingRouter from "./Routes/billing.route.js";

const app = express();
const privateCors=cors({
    origin:[
          "https://aira-voice-assistant-ai.onrender.com"
    ],
    credentials:true
});

const publicCors=cors({
 origin:"*" ,
})

app.use(cors({
    origin:"https://aira-voice-assistant-ai.onrender.com",
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",privateCors,authRouter);
app.use("/api/user",privateCors,userRouter);
app.use("/api/billing",privateCors,billingRouter);
app.use("/api/assistant", publicCors,assistantRouter);

const PORT=process.env.PORT;

 app.get('/',(req,res)=>{
res.json("hello from server")
 })


app.listen(PORT,()=>{
    console.log(`Server islistening on port ${PORT}`)
    connectDB();
 })
