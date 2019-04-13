const router = require('express').Router();
const { healthcheckToDB } = require('../db/mongoose');

router.get('/', (req, res) => {
    const health = healthcheckToDB()
    if(health){
        res.send({health})
    } else {
        res.status(500).send({health})
    }
})

module.exports = router;