const express = require('express');
const Posts = require('./postDb');
const postsRouter = express.Router();

const message500 = { error: "The posts information could not be retrieved." };

postsRouter.get('/', (req, res) => {
    Posts
        .get()
        .then(posts => { res.status(200).json(posts) })
        .catch(err => {
            res.status(500).json(message500);
        })
});

postsRouter.get('/:id', (req, res) => {
    const message404 = { error: "The post with the specified ID does not exist." }
    const message500 = { error: "The post information could not be retrieved." }

    Posts
        .getById(req.params.id)
        .then(post => {
            post ? res.status(200).json(post) : res.status(404).json(message404);
        })
        .catch(err => { res.status(500).json(message500) })
});


module.exports = postsRouter;