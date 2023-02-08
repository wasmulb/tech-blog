const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
    // find all categories
    // be sure to include its associated Products
    try{
       const userData = await User.findAll({
        // include: [{ model: Product }]
       });
       res.status(200).json(userData);
    } catch(err){
      res.status(500).json(err)
    }
  });

  module.exports = router