const Sequelize = require('sequelize')
const db = require('../db')

const Image = db.define('image', {
    colorData: Sequelize.STRING,
    awsUrl: Sequelize.STRING,
})

module.exports = Image