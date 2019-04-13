# Devops Challenge

Welcome to the `DevOps-App` the app that will fetch gists for your favorite Github Users. 

The app will fetch the gists using a schedule defined by crontab. 

The default value is `*/5 * * * *` in local and `* */3 * * *` in live, to change the value just create a environment variable with name `GISTS_CRON`.

To access the gists you need to access the path `/gists/:username` where the `:username` is the Github username of the Github User.

When you look for the first time for a user the in the app, the app will store the user and will start a fetch of the user's gists. So in the next time it you will see the gists of that Github user.

The app will show you the gists that still didn't see, in the next time that gists will be hidden from you, if you want to see all gists use the parameter `all`  like this ``/gists/:username?all`

All the Gists and Users are stored in a Mongo DB that allow the app to have some resiliency

## Run in Live

The live app [devops-app](http://devopsapp.moser.work/gists/moser-ss) is hosted in the Google Could data centers in Kubernetes Cluster.

The app is defined in a Deployment Controller that allow us to have scalility and liveness checks

The Mongo DB mount Persistent Volume in Google Could to allow presistent data.

## Run locally 

## Requirements
To run the DevOpsApp in your machine it is necessary an Internet connection and Docker Desktop installed 

## To start
Execute the command `docker-compose up` in the github-api directory
To stop the service just press `Ctrl+C`

## How to use
Open an browser and got to `localhost:3000/gists/:username`  then  you can see the gists of you Github user

## To develop
Install dependencies 

`npm install`


Start database
`docker-composer up mongodb`

Start application
`node src/app.js`

Execute the command `docker-compose up --build` to rebuild the Docker image if you want to user the docker-compose solution

## Endpoints

`GET /gists/:username`  

parameters : `all` to fetch all gists

Returns the not viewed gists, if the username is not store in the app it will create a user with that username and fetch the gists.


`GET /heatlh` 

Returns the health state of the app
