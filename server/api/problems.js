const router = require('express').Router()
const {Problem} = require('../db/models')

// GET /api/problems
router.get('/', async (req, res, next) => {
  try {
    const problems = await Problem.findAll()
    res.json(problems)
  } catch (err) {
    next(err)
  }
})

// GET /api/problems/:id
router.get('/:id', async (req, res, next) => {
  try {
    const problem = await Problem.findById(req.params.id)
    if (problem) {
      res.send(problem)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
