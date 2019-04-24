const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const postsRouter = require('./posts/postsRouter');
const usersRouter = require('./users/usersRouter');

const server = express();

// Configure global middleware
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.get('/', (req, res) => {
    res.send(`
    <h2>Web 18 - API III Challenge </h2>
    `);
});

server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

module.exports = server;
