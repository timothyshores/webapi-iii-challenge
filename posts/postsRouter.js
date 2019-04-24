const express = require('express');
const Posts = require('./postDb');
const postsRouter = express.Router();


postsRouter.get('/', (req, res) => {
    const message500 = { error: "The posts information could not be retrieved." };

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
            post
                ? res.status(200).json(post)
                : res.status(404).json(message404);
        })
        .catch(err => { res.status(500).json(message500) })
});

postsRouter.post('/', (req, res) => {
    const { text, user_id } = req.body;
    const message400 = { error: "Please provide text and user_id for the post." }
    const message500 = { error: "There was an error while saving the post to the database" };

    if (text && user_id) {
        Posts
            .insert({ text, user_id })
            .then(post => { res.status(201).json(post) })
            .catch(err => { res.status(500).json(message500) })
    }
    else {
        res.status(400).json(message400);
    }
});

postsRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    const message200 = { message: `Deleted post id: ${id}` };
    const message404 = { message: `Post id:${id} does not exist.` };
    const message500 = { error: `Post id:${id} could not be removed` };

    Posts
        .remove(id)
        .then(response => {
            response === 1
                ? res.status(200).json(message200)
                : res.status(404).json(message404)
        })
        .catch(error => {
            res.status(500).json(message500);
        });
});

postsRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const { text, user_id } = req.body;

    const message400 = { error: "Please provide text and user_id for the updated post." };
    const message404 = { error: "The post with the specified ID does not exist." };
    const message500 = { error: "The post could not be removed" };

    if (text === '' || user_id === '') {
        res.status(400).json(message400);
    }
    else {
        Posts
            .update(id, { text, user_id })
            .then(response => {
                response === 1
                    ? res.status(200).json(response)
                    : res.status(404).json(message404)
            })
            .catch(error => { res.status(500).json(message500) });
    }
});

module.exports = postsRouter;