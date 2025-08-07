import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
//import { supabaseClient,supabaseAdmin} from "./database/supabase.js";
import logIn from "./routes/logIn.js";
import signUp from "./routes/signUp.js";
import verifyToken from "./routes/verifyToken.js"
import adminLogIn from "./routes/adminLogIn.js";
//import passwordReset from "./routes/passwordRecovery.js"
import home from './routes/home.js'
import adminHome from './routes/adminHome.js'
import dropdowns from './routes/dropdowns.js'
import upload from './routes/upload.js'

//see this too by writing before env.config()

const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.use(cors(
    {
        origin:"https://nit-manipur-pyq.vercel.app",
        methods:["DELETE","GET","POST"]
    }
))

app.get('/', (req, res) => {
    console.log(req.body);
    return res.status(200).json({ message: "Server is running" });

})

app.use('/auth/logIn',logIn);
app.use('/auth/signUp',signUp);
app.use('/auth/verifyToken', verifyToken);
app.use('/auth/adminLogIn',adminLogIn);
app.use('/home',home);
app.use('/adminHome',adminHome);
app.use('/dropdowns',dropdowns);
app.use('/upload',upload);

app.listen(process.env.PORT,()=>
    {
    console.log(`server running on port ${process.env.PORT}`);}
);