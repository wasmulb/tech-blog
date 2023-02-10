const router = require('express').Router();

router.post('/signin', (req, res) => {
    req.session.isSignedIn = true
    console.log(req.session)
    res.json({ message: "Signed In!" })
})

router.post('/signout', (req, res) => {
    req.session.isSignedIn = false
    console.log(req.session)
    res.json({ message: "Signed out!" })
})

module.exports = router;