const dotenv = require('dotenv').config();

const Server = require('./model/index.js')

const server = new Server();

server.listen();