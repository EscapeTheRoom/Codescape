const db = require('../db')
const Sequelize = require('sequelize')

const Problem = db.define('problem', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  prompt: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  functionSetup: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  spec: {
    type: Sequelize.BLOB('long'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Problem
