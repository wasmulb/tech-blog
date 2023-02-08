const router = require('express').Router();
const { Post } = require('../../models');

router.get('/', async (req, res) => {
    // find all categories
    // be sure to include its associated Products
    try{
       const postData = await Category.findAll({
        // include: [{ model: Product }]
       });
       res.status(200).json(postData);
    } catch(err){
      res.status(500).json(err)
    }
  });

  module.exports = router