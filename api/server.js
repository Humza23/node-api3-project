
const express = require('express');
const {logger} = require('./middleware/middleware')
const server = express();
const usersRouter = require('./users/users-router')
server.use(express.json())
// global middlewares and the user's router need to be connected here

server.use(logger)

server.use('/api/users', usersRouter)

module.exports = server;