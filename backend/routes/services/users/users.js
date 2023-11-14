const express = require('express');
const usersRouter = express.Router();
const User = require('./models/User');

usersRouter.get('/', (req, res, next) => {
    User.find({})
        .then(users => {
            res.send(users.length? users: 'No users found');
        })
        .catch(next);
})

usersRouter.post('/', (req, res, next) => {
    const user = new User(req.body);
    user.save()
        .then(user => {
            res.send(user);
        })
        .catch(next);
})

usersRouter.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.send(user ?? 'No user found');
})

usersRouter.post('/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
    res.send(user ?? 'No user found');
})

module.exports = usersRouter;