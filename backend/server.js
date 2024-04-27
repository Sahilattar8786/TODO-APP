const express =require('express');
const dotenv=require("dotenv");
const cors = require('cors');
const {notFound, errorHandler}=require("./middleware/errorMiddleware")
const connectDB=require('./config/db');

dotenv.config();
const app =express();
app.use(express.json())
const userRoute =require('./routes/userRoute')
connectDB();
app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.send("API Is Running");
})
app.use("/api/users",userRoute);
app.use(notFound);
app.use(errorHandler);

app.listen(5000,()=>{
    console.log("Server Statred")
})
