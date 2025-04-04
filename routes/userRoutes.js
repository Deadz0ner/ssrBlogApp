import { Router } from "express";
import User from "../models/userModel.js";

const router = Router();

router.get('/signin', (req,res)=>{
    return res.render("signin");
});

router.get('/signup', (req,res)=>{
    return res.render("signup");
});

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await User.matchPassword(email, password);
        console.log(token);

        return res.cookie("token", token).redirect('/');
    } catch (error) {
        return res.render("signin", {
            error: "Incorrect email or Password",
        })
    }
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.render('home');
});

router.post('/logout', (req, res) => {
    res.clearCookie("token");
    return res.redirect('/user/signin');
});


export default router;
