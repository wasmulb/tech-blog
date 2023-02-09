const router = require('express').Router();
const { User, Post } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try{
    const userData = await User.findByPk(req.params.id, {
      include: [{ model: Post}]});
    if(!userData){
      res.status(404).json({ message: 'No user found with that ID!'});
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })

    res.status(200).json(newUser)
  }
  catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router