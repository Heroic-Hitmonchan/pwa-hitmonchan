const Sequelize = require('sequelize')
const db = require('../db')

const Song = db.define('song', {
    spotifySongId: Sequelize.STRING,
    artistName: Sequelize.ARRAY(Sequelize.STRING),
    trackName: Sequelize.STRING,
    artistSpotifyId: Sequelize.STRING,
    album: Sequelize.STRING
})

module.exports = Song