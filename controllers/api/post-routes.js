const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

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

       res.status(200).json(postData);
    } catch(err){
      console.error(err)
      res.status(500).json(err)
    }
  });

  router.post('/', async (req, res) => {
    console.log(req.body)
    try {
      const newPost = await Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.user_id,
      })
  
      res.status(200).json(newPost)
    }
    catch (err) {
      res.status(500).json(err);
    };
  });

  router.put('/:id', (req, res) => {
    Post.update(
      {
      content: req.body.content
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then((updatedPost)=>{
      res.status(200).json(updatedPost)
    })
    .catch((err)=>{
      res.status(500).json(err)
    })
  });

  router.delete('/:id', (req, res) => {
    Post.destroy({
      where:{
        id: req.params.id,
      },
    })
    .then((deletedPost)=>{
      res.status(200).json(deletedPost);
    })
    .catch((err)=>{
      res.status(500).json(err)
    })
  });

  module.exports = router