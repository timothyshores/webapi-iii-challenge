const express = require('express');
const Users = require('./userDb');
const usersRouter = express.Router();

usersRouter.get('/', (req, res) => {
    const message500 = { error: "The users information could not be retrieved." };

    Users
        .get()
        .then(users => { res.status(200).json(users) })
        .catch(err => {
            res.status(500).json(message500);
        })
});

usersRouter.get('/:id', (req, res) => {
    const message404 = { error: "The user with the specified ID does not exist." }
    const message500 = { error: "The user information could not be retrieved." }

    Users
        .getById(req.params.id)
        .then(user => {
            user
                ? res.status(200).json(user)
                : res.status(404).json(message404);
        })
        .catch(err => { res.status(500).json(message500) })
});

module.exports = usersRouter;