const db = require('../db')
const Sequelize = require('sequelize')

const Problem = db.define('problem', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  prompt: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  functionSetup: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  spec: {
    type: Sequelize.BLOB('long'),
    allowNull: false
  }
})

module.exports = Problem
