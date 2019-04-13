const axios = require('axios');
const gitHubHost = 'https://api.github.com';

const gitHubAPI = axios.create({
    baseURL: gitHubHost,
    timeout: 5000,
});


async function getGistFromUser(username) {
    console.info(`Getting gists from user : ${username}`)
    try {
        const result = await gitHubAPI.get(`/users/${username}/gists`)
        console.info(`Gists collected from user : ${username} `)
        return result.data
    } catch (error) {
        console.error(`Fail to get gists from user : ${username} -- error : ${error}`)
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
          }  else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error', error.message);
          }
        return []
    }
}

module.exports = {
    getGistFromUser
}