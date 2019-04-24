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

module.exports = usersRouter;