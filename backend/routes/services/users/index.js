const express = require('express');
const router = express.Router();
const User = require('./models/User');
const axios = require("axios");
const authenticateUserToken = require("../../Auth/authenticateToken");

router.get('/', (req, res, next) => {
    try {
        User.find({})
            .then(users => {
                res.send(users.length ? users : 'No users found');
            })
            .catch(next);
    } catch (err) {
        res.status(500).send(err);
    }
})

router.post('/', (req, res) => {
    try {
        axios.post(`${process.env.FULL_URL}/api/register`, req.body).then(response => {
            res.status(301).json(response.data);
        }).catch(error => {
            res.status(400).json(error);
        })
    } catch (err) {
        res.status(500).send(err);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.send(user ?? 'No user found');
    }catch (err) {
        res.status(500).send(err);
    }
})

router.post('/:id',  authenticateUserToken, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.send(user ?? 'No user found');
    }catch (err) {
        res.status(500).send(err);
    }
})


module.exports = router;