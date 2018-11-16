const router = require('express').Router()
const path = require('path')

// POST /api/docker
router.post('/', (req, res,  next) => {
    res.sendFile(path.join(__dirname, '..', 'tests', 'test1.spec.js'))
})

module.export = router;