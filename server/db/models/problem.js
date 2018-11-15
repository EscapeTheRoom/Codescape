const db = require('../db');
const Sequelize = require('sequelize');

const Problem = db.define('problem', {
    title : {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        }
    },
    prompt:{
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        }
    },
    solution:{
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        }
    }
})

module.exports = Problem;