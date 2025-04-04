import {Router} from 'express';

const router = Router();

router.get('/add-new', (req,res)=>{
    return res.render("blog", {
        user: req.user,
    })
})


export default router;