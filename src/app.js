require('log-timestamp');
const config = require('./config/config.json');
const {
    connectToDB,
    populateWithDefault
} = require('./db/mongoose');
const express = require('express');
const app = express();
app.disable('x-powered-by');
const port = process.env.PORT || config.PORT
const router = require('./router')
const jobs = require('./jobs')
const gistsCron = process.env.GISTS_CRON || config.GISTS_CRON

connectToDB().then(async() => {
    await populateWithDefault()
    jobs.updateGists(gistsCron)
    app.use('/', router)
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    
    })
})

