const router = require('express').Router();
const { Comment, User, Post} = require('../../models');

router.get('/', async (req, res) => {
    try{
       const commentData = await Comment.findAll({
        include: [{ model: User }]
       });
       res.status(200).json(commentData);
    } catch(err){
      res.status(500).json(err)
    }
  });

  router.post('/', (req, res) => {
    Comment.create({
      content: req.body.content,
    })
    .then((newComment)=>{
      res.status(200).json(newComment)
    })
    .catch((err)=>{
      res.status(500).json(err);
    });
  });

  router.put('/:id', (req, res) => {
    Comment.update(
      {
      content: req.body.content
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then((updatedComment)=>{
      res.status(200).json(updatedComment)
    })
    .catch((err)=>{
      res.status(500).json(err)
    })
  });

  router.delete('/:id', (req, res) => {
    Comment.destroy({
      where:{
        id: req.params.id,
      },
    })
    .then((deletedComment)=>{
      res.status(200).json(deletedComment);
    })
    .catch((err)=>{
      res.status(500).json(err)
    })
  });

  module.exports = router