const mongoose = require('mongoose');
const { User } = require('../models/user')
const fs = require('fs');
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);
const { MONGO, USERS } = require('../config/config.js')
const mongoHost = process.env.MONGO_HOST || MONGO.HOST
const mongoPort = process.env.MONGO_PORT || MONGO.PORT
const mongoDB = process.env.MONGO_DB || MONGO.DB
const mongoUser = process.env.MONGO_USER || MONGO.USER
mongoose.Promise = global.Promise


async function connectToDB() {
    try {
        const mongoPass = fs.readFileSync(process.env.MONGO_PASS_FILE,{
            encoding: 'utf-8'
        })
        const mongoURI = `mongodb://${mongoUser}:${mongoPass}@${mongoHost}:${mongoPort}/${mongoDB}?authSource=admin`
        await  mongoose.connect(mongoURI, { useNewUrlParser: true })
        console.log(`Connection opened to DB ${mongoHost}`);
    } catch (error) {
        console.error(`Failed to connect to DB ${mongoHost} with error: ${error}`);
        console.info('Retry in 5 seconds')
        await setTimeoutPromise(5000)
        await connectToDB()
    }
}

async function populateWithDefault() {
    const usersToSave = USERS.map((user) => {
        const newUser = new User({
            username:user
        })
        console.info(`Create user model for user : ${user}`);
        return newUser.save();
    })
    try {
        await Promise.all(usersToSave);
        console.info(`Default Users saved in DB : ${JSON.stringify(USERS)}`)
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