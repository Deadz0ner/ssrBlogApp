import express from "express";
import connectToDatabase from "./connection.js";
import path from "path";
// import staticRoute from './routes/staticRoutes.js'
import userRoutes from "./routes/userRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"
import cookieParser from "cookie-parser";
import checkAuth from "./middlewares/auth.js"


const app = express();
const port = 8000;
app.listen(port, ()=>{
    console.log(`Server Started at port ${port}`);
})

app.use(express.json()); // Add this middleware to parse JSON payloads
app.use(express.urlencoded({extended:false}));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(cookieParser());
// checkAuth("token")  use this middleware wherever authentication is required.

app.get("/",checkAuth("token"), (req, res)=>{
    res.render("home",{
        user: req.user,
    });
})

app.use("/user",  userRoutes);
app.use("/blog",  blogRoutes);

connectToDatabase("mongodb://127.0.0.1:27017/blog_app");


