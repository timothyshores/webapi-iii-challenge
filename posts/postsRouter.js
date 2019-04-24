const express = require('express');
const Posts = require('./postDb');
const postsRouter = express.Router();

postsRouter.get('/', (req, res) => {
    Posts
        .get()
        .then(users => { res.status(200).json(users) })
        .catch(err => {
            const message500 = { error: "The users information could not be retrieved." };
            res.status(500).json(message500);
        })
});

module.exports = postsRouter;