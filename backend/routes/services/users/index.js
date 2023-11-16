const express = require('express');
const router = express.Router();
const User = require('./models/User');
const axios = require("axios");
const authenticateUserToken = require("../../Auth/authenticateToken");

router.get('/', (req, res, next) => {
    User.find({})
        .then(users => {
            res.send(users.length? users: 'No users found');
        })
        .catch(next);
})

router.post('/', (req, res) => {
    axios.post(`${process.env.FULL_URL}/api/register`, req.body).then(response => {
        res.status(301).json(response.data);
    }).catch(error => {
        res.status(400).json(error);
    })
})

router.get('/serviceProviderId', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.send(user ?? 'No user found');
})

router.post('/serviceProviderId',  authenticateUserToken, async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
    res.send(user ?? 'No user found');
})

module.exports = router;