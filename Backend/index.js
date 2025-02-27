import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"; // ana thi .env file ne access kari sakay
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"; // ahiya userRoute na badle kai biju name aapiye to pan chale
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/jobs.route.js";
import applicationRoute from "./routes/application.route.js"

import path from "path";

dotenv.config({}); // ana thi sensitive information like database no URL and credentials che source code uper 
// mukisu to e nahi dekhay bija loko ne 


const app = express();
const port = process.env.port || 3000; // pehla lakhyu e exist kartu hase to e aavse nahi to 3000
// ahiya je process.env.port ma je port che e .env file sathe match thavu joie

const __dirname = path.resolve();

// AA BASIC HATU CHECK KARVA MATE KHALI
// app.get('/home' ,(req,res) => {
//     // return res.send("Hello");
//    return res.status(200).json({
//         message:"Hello , i am coming from backend", // json(object) na form ma data dekhase
//         success :true
//     })
// })

// middleware
app.use(express.json()); // ana thi beackend maje data aavse e object na form ma convert thase and req.body ma store thase
app.use(express.urlencoded({ extended: true })); // form na data ne object ma convert kare
app.use(cookieParser());
const corsOptions = {
    origin: 'https://fullstack-job-portal-2.onrender.com',
    credentials: true
}
app.use(cors(corsOptions));




// API's

app.use("/api/v1/user", userRoute);
// http://localhost:8000/api/v1/user pachi userRoute uper jase ane /register /login /updateProfile evi rite execute thase
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.get('/', (req, res) => {
    res.send('API is running...');
  });

if(process.env.NODE_ENV === "development"){
    app.use(express.static(path.join(__dirname,"../Frontend/dist")));


    app.get("*",(req,res) => {
        res.sendFile(path.join(__dirname,"../Frontend","dist","index.html"))
    })
}

app.listen(port, () => {
    connectDB();
    console.log(`Listening on port ${port}`);
});
