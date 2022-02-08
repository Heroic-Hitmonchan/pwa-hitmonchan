const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    let user = await User.findOrCreate({
      where: {
        spotifyUserId: req.body.id
      }, 
      defaults: {
        displayName: req.body.display_name,
        email: 'test@gmail.com'
      }
    })
    console.log('user:', user)
    if (user[1]) {res.status(201).send(user[0])}
    else {res.send(user[0])}
  } catch (err) {
    next(err)
  }
})
