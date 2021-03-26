const Joi = require('joi');
const _ = require('lodash')
const router = require('express').Router();
const {Gist} = require('../models/gist');
const { User } = require('../models/user')
const { updateAndStoreGits } = require('../tasks/gists');


const requestSchema = Joi.object({
    username: Joi.string()
})
router.get('/:username', async (req, res) => {
    let validatedParams
    try {
       validatedParams = requestSchema.validate(req.params)
    } catch (error) {
        res.status(400).send({
            message: 'Invalid request format'
        })
    }
    const { username } = validatedParams
    const user = await User.findOne({
        username: username
    })

    if(!user){
        const newUser = new User({
            username
        })
        try {
            await newUser.save()
            res.status(404).send({
                username,
                message: `User ${username} in Users Collection. User added and gits will be fetch now. In an moments it will be available`
            })
            updateAndStoreGits(username)
        } catch (error) {
            res.status(409).send({
                username,
                message: `User ${username} already exists in Users Collection.`
            })
        }

    } else{
        const viewed = ! _.isEmpty(req.query) && _.has(req.query, 'all')
        const gists = await Gist.find({
            username: username,
            viewed: viewed
        })
        if(!_.isEmpty(gists)){
            await Gist.updateMany({
                username: username,
                viewed: false
            },{ 
                $set: {
                    viewed: true
                }
            })
        }
        const gistsToSend = gists.map(gist => gist.html_url)
        res.status(200).send({
                username,
                gists: gistsToSend
        })
    }
});

module.exports = router;