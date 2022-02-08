const router = require('express').Router()
// const { default: axios } = require('axios')
const { models: { User, Image, Song }} = require('../db')
module.exports = router

router.post('/:imageId', async (req, res, next) => {
  try {
    console.log(req.body)
      const song = await Song.findOrCreate({
        where: {
          spotifySongId: req.body.song,
          artistName: req.body.artistName,
          trackName: req.body.trackName,
          imageId: req.params.imageId
        }
      })
      console.log(song)
      if (song[1]) {
        console.log(Object.keys(song[0].__proto__))
        const image = await Image.findByPk(req.params.imageId)
        song[0].setImage(image)
        await song[0].save()
        res.status(201).send(song[0])
      } else res.send(song[0])
  } catch (err) {
    next(err)
  }
})
// router.get("/history", (req, res, next) => {
//   try {
//     const history = await Image.findAll({
//       where: {

//       }
//     })
//   } catch (error) {
//     next(error)
//   }
// })