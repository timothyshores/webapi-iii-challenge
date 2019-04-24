const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();

// Configure global middleware
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.get('/', (req, res) => {
    res.send(`
    <h2>Web18 </h2>
    <p>Web API III Challenge</p>
    `);
});

module.exports = server;
