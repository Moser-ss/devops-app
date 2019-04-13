const _ = require('lodash');
const { Gist } = require('../models/gist')
const { getGistFromUser} = require('../clients/github');

async function updateAndStoreGits(user) {
    const gists = await getGistFromUser(user);
    if (! _.isEmpty(gists)){
        await storeGists(gists)
    } else {
        console.info(`Nothing to update for user : ${user}`)
    }
}

async function storeGists( gists ) {
    const gitsToStore = gists.map( gist => storeGist(gist));
    await Promise.all(gitsToStore)
}

async function storeGist(gist) {
    const {id, owner, html_url} = gist
    try {
        console.info(`Saving gist id: ${id} from user ${owner.login}`);
        const newGist = new Gist({
            username: owner.login,
            html_url: html_url,
            github_ID: id
        });
        const gistSaved = await newGist.save();
        if (_.isEqual(gistSaved, newGist)) {
            console.info(`Saved successfully gist id: ${id} from user ${owner.login}`);
        } else {
            console.error(`Failed to store gists from user ${owner.login}`);
        }
    } catch (error) {
        //Ignore error code 11000 because it is the error code for duplicated key
        if(error.code != 11000){
            console.error(`Failed to store gists from user ${owner.login}. Error : ${error}`)
        }
    }
}

module.exports = {
    updateAndStoreGits
}
