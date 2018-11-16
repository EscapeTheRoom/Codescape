const axios= require ('axios')
const router = require('express').Router()
const {Problem} = require('../db/models')

// POST /api/docker
router.post('/', async (req, res,  next) => {
    try{
        console.log('req.body', req.body)
        const { spec } = await Problem.findById(req.body.id)
        console.log('specbefore', spec)
        const outputData = {
            spec,
            code: req.body.code
        }
        const { data } = await axios.post('http://172.16.27.212:8000', outputData)
        console.log('data', data)
        res.send(data)
    } catch (err){
        console.error(err)
        next(err)
    }
})

module.exports = router;