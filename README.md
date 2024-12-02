# Technical Stack

- Frontend: React, TypeScript, Axios
- Backend: Node, Express
- ORM: Prisma
- Database: MongoDB

# Docker

## Docker MongoDB for development

Build the mongo container
`docker-compose build --no-cache mongo`

Run the mongo container:
`docker run --name mongodb -d -p 27017:27017 mongo`