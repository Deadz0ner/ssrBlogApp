import {Router} from 'express';
import blog from "../models/blogs.js"
const router = Router();

router.get('/add-new', (req,res)=>{
    
    return res.render("blog", {
        user: req.user,
       
    })
    
});

router.post('/post-blog',(req,res)=>{
    const {title, content} = req.body;
    blog.create({
        title,
        content,
    })
    res.redirect("/blog/add-new");
})


export default router;