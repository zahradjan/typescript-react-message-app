

# Message App 

This message app is clone project from [Project Chat Application](https://github.com/adrianhajdin/project_chat_application). 
It was slightly modified, and main difference is that it is written entirely in TypeScript. It also has functional docker-compose for development purpose. 
Main goal of this project was to get better at TypeScript and understanding of WebSockets with Socket.io library.

<p align="center">
<img height="400px" src="/pics/messageapp.PNG">
</p>

### Prerequisites

To run this project in development process you just need docker. Or you can run it locally with production build.

### Installing

To run in it in docker compose simply run docker-compose up --build

```
docker-compose up --build
```

To run it locally you need to install all necessary modules in package.json from client and server

For development build
```
npm install - in both server and client folder
npm start - in both server and client folder
```
Your app should run on localhost:3000 

For production build
```
npm install - in both server and client folder
npm run build - in client folder 
npm start - in server folder
```

Your app should run on localhost:5000 

## Running the tests

App does not have any tests.

## Deployment

If you wish you can deploy backend in heroku for instance and client folder in netlify as shown in original  [Project Chat Application](https://github.com/adrianhajdin/project_chat_application). 

## Built With

* [Node](https://nodejs.org/en/) - Dependency Management
* [React](https://reactjs.org) - Frontend framework
* [Socket.io](https://socket.io) - WebSocket Library



## Authors

* **John Gardener** - *Whole project* - [ocasusMaximus](https://github.com/ocasusMaximus)
