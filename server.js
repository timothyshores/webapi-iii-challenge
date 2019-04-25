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

server.get('/api/users/:id/posts', (req, res) => {
    const { id } = req.params;
    const Posts = require('./posts/postDb');

    const message404 = { error: `User id: ${id} does not have any posts.` }
    const message500 = { error: `Posts for user ${id} information could not be retrieved.` };

    Posts
        .get()
        .then(posts => {
            const filterPosts = posts.filter(post => post.user_id == id);
            filterPosts.length > 0
                ? res.status(200).json(filterPosts)
                : res.status(404).json(message404)

        })
        .catch(err => {
            res.status(500).json(message500);
        })

});

server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

module.exports = server;
