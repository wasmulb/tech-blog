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
      // include: [{ model: Post}],
    });
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

    if(!newUser){
      res
      .status(400)
      .json({ message: 'Invalid email, username, or password, please try again' });
    return;
    }

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.isSignedIn = true;
      
      res.json({ user: newUser, message: 'You are now logged in!' });
    });

// initialize a session
  }
  catch (err) {
    res.status(500).json(err);
  };
});

router.post('/signin', async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.isSignedIn = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
})

router.post('/signout', (req, res) => {
  if (req.session.isSignedIn) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
})

module.exports = router