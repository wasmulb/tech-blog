const router = require('express').Router();

router.get('/signin', (req, res) => {
    req.session.isSignedIn = true
    console.log(req.session)
    res.json({ message: "Signed In!" })
})

router.get('/signout', (req, res) => {
    req.session.isSignedIn = false
    console.log(req.session)
    res.json({ message: "Signed In!" })
})

module.exports = router;