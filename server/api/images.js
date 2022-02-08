const router = require('express').Router()
const { models: { User, Image }} = require('../db')
module.exports = router

router.post('/:id', async (req, res, next) => {
  try {
    console.log('id:', req.params.id)
    let user = await User.findOne({where: {spotifyUserId: req.params.id}})
    console.log('user:', user)
    if (!user) res.send({error: 'no user found'})
    let image = await Image.findOrCreate({
        where: {
            colorData: req.body.colorData,
            userId: user.id
        },
        defaults: {
            awsUrl: req.body.url,
        }
    })
    if (image[1]) {
        image[0].setUser(user)
        await image[0].save()
        res.status(201).send(image[0])
    }
    else {res.send(image[0])}
  } catch (err) {
    next(err)
  }
})
