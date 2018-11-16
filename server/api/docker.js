const router = require('express').Router()

// POST /api/docker
router.get('/', (req, res,  next) => {
    res.send('hello') 
})

module.exports = router;