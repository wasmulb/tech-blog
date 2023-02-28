const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require("../utils/auth")

router.get('/', async (req, res) => {
    try{
        let postData = await Post.findAll({
         include: [{ model: User }]
        });
        
        postData = postData.map((post) => {
         post = post.get({ plain: true });
         delete post.user.password;
         return post;
        });
       res.render("homepage", {
        isSignedIn: req.session.isSignedIn,
        postData
       })
     } catch(err){
       console.error(err)
       res.status(500).json(err)
     }

});

router.get('/dashboard', withAuth, (req, res) => {
    res.render('dashboard', {
        isSignedIn: req.session.isSignedIn,
        username: req.session.username
    })
})

router.get('/login', (req, res) => {
    if(req.session.isSignedIn){
        res.render("/dashboard")
        return
    }
    res.render('login')
})

router.get('/signup', (req, res) => {
    if(req.session.isSignedIn){
        res.render("/dashboard")
        return
    }
    res.render('signup')
})

module.exports = router;