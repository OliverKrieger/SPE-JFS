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

It will of course be easier to run `docker-compose up` or `docker-compose up build` to run locally.

# Endpoint Testing

## ReqBin

https://reqbin.com/