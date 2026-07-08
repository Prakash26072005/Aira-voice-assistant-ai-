import express from "express"
import dotenv from "dotenv"; 
import connectDB from "./Configs/ConnectDB";
const app = express();
dotenv.config();
const PORT=process.env.PORT;

 app.get('/',(req,res)=>{
res.json("hello from server")
 })

app.listen(PORT,()=>{
    console.log(`SErver islistening on port ${PORT}`)
    connectDB();
 })