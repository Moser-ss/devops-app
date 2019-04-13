const cron = require('node-cron');
const { User } = require('./models/user');
const {updateAndStoreGits} = require('./tasks/gists')
const jobs = {};

jobs.updateGists = function(schedule) {
    console.info(`Scheduling updateGists job with corn : ${schedule}`)
    cron.schedule(schedule, async() => {
        console.info('Checking new Gists')
        const users = await User.find({});
        const tasksToComplete = users.map(user => updateAndStoreGits(user.username))
        await Promise.all(tasksToComplete)
        console.info('Check for new Gists finished')
    });
};

module.exports = jobs;