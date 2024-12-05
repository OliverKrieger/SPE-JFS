# Technical Stack

- Frontend: React, TypeScript, Vite, Axios, Redux
- Backend: Node, Express, Axios, Cors, JWT
- ORM: Prisma
- Database: MongoDB

# Local Testing

To run locally without docker-compose, you can run both frontend and backend with `yarn dev` and setup your own mongo instance. However, it would be easier to run docker-compose up once at least and create a user. Then you can stop all the containers, except db, which has now been intialised and connect with yarn dev to it outside of docker container. You will need to setup your own local env. files, for backend the recommendation would be:

DATABASE_URL="mongodb://admin:password@127.0.0.1:27017/db?authSource=admin&directConnection=true"
JWT_SECRET= "nXFgq8N2XXWkNf3zKfLg3mrFnC+BGdbIkCFOgmlJfwc="
BACKEND_PORT= "5000"
FRONTEND_URL= "http://localhost:5173"
NODE_ENV="local"

It will of course be easier to run `docker-compose up` or `docker-compose up --build` to run locally.

# Functionality

As the base of the project used React TypeScript and Node Express, those were the chosen technologies for the frontend and backend. I added axios to frontend for ease of making requests (could have used fetch, this is a prefrence choice) and chose mongo to be the NoSQL database. To make database communications and configurations easier I added prisma, as it supports mongo out of the box.

For ease of development (especially for running the database) everything is containerised in docker and for local development, is ran with docker-compose.

# Tradeoffs

The current architecture of the project is quite simplistic, but robust - the user can create an account, which also registers an agent with spacetraders.io. On a successful creation both are stored into the database and the user can log in. Session tokens are stored into http cookies using JWT so they could not be accessed javascript and thus provides an extra layer of security. 

Currently, only the password is encrypted when it is stored into the database for security, but additions to encrypt everything to make sure that nothing is stored in plaintext for security can be added without too much extra work.

All of the user requests are made with the session token which is used to validate the user (given on login, stored for 1h). Rather than relying on userID, this made more sense, as it is more robust to validate on requests and if the token has expired, it is easy enough to delete and force the user to log in again. Since the state is managed by redux, if the login state changes, the entire app returns to the login screen until the user logs in again.

From the data point of view, when the user wants to view the ships, first the server checks if the data is stored into the database and also validates the expiery time on that data. If both check out, the data is returned. If not, an api request is made that then stores the data and returns all of the ship symbols. It would be straight forward enough to return all of the ship data to have to communicate with the server and database less, but that would come at the cost of data robustness (what is the data is updated in the mean time?). While it might increase the load time, it ensures that the most up to date data is always retrieved from the database. It also means that less data has to be retrieved when querying for ships only and not ship data.
Of course, if the load times increase, all the ships with their relevant info could be queried instead and stored on the frontend, only making one request to the server on the opening of the tab.

On the frontend, everything is componentised, meaning that it is an SPA. Rather than changing routes, this makes the data and state managemenet much easier and fits well with something like the spacetraders.io. Tabs can be easily added to showcase more routes as they are added and there is a profile section to view user data and delete the user if need be. Spacetraders.io does not currently provide a delete agent on their side however, so the user will have to select a new username to create a new account each time.

There are also tests added to backend with jest, though currently it only tests the login functionality. However, this could be extended to run any other tests as required.