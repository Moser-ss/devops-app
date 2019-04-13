const mongoose = require('mongoose');
const { User } = require('../models/user')
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);
const config = require('../config/config.json')
const mongoURL = process.env.MONGODB_URI || config.MONGODB_URI
mongoose.Promise = global.Promise


async function connectToDB() {
    try {
        await  mongoose.connect(mongoURL, { useNewUrlParser: true })
        console.log(`Connection opened to DB ${mongoURL}`);
    } catch (error) {
        console.error(`Failed to connect to DB ${mongoURL} with error: ${error}`);
        console.info('Retry in 5 seconds')
        await setTimeoutPromise(5000)
        await connectToDB()
    }
}

async function populateWithDefault() {
    const usersToSave = config.USERS.map((user) => {
        const newUser = new User({
            username:user
        })
        console.info(`Create user model for user : ${user}`);
        return newUser.save();
    })
    try {
        await Promise.all(usersToSave);
        console.info(`Default Users saved in DB : ${JSON.stringify(config.USERS)}`)
    } catch (error) {
        console.log(JSON.stringify(error))
        console.warn(`Add default users failed : ${error}`)
    }

}
function healthcheckToDB() {
    let healthCheck = false
    try {
        const readyState = mongoose.connection.readyState
        if(readyState == 1 || readyState ==2 ){
            healthCheck = true
        }
    } catch (error) {
        console.error(`Failed to check DB health state. Error :  ${erro}`)
    }finally{
        return healthCheck;
    }
}

module.exports = {
    connectToDB,
    populateWithDefault,
    healthcheckToDB
}