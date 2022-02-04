//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Image = require('./models/Image');
const Song = require('./models/Song')

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Image,
    Song
  },
}
