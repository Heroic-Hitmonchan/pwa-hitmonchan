//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Image = require('./models/Image');
const Song = require('./models/Song')

//associations could go here!

// User - Image | O - M
User.hasMany(Image)
Image.belongsTo(User)

// Image - Song | O - M
Image.hasMany(Song)
Song.belongsTo(Image)


module.exports = {
  db,
  models: {
    User,
    Image,
    Song
  },
}
