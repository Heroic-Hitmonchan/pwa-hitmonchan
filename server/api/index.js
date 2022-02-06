const router = require('express').Router()
module.exports = router

const generateUploadURL = require('./s3')

router.get('/s3Url', async (req, res) => {
  const url = await generateUploadURL()
  res.send(url)
})

router.use('/users', require('./users'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
