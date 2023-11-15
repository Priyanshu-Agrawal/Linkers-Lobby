const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
require('dotenv').config();
const Category = require('./models/category');


mongoose.connect(process.env.MONGODB_URL)
    .then((result) => {
        console.log(`DB Connected`);
        // console.log(result);
    })
    .catch((err) => {
        console.error(`Connection Failed ${err}`);
    });


router.get('/', (req, res, next) => {
    Category.find({})
        .then((result) => {
           res.send(result.length ? result : 'No categories found')
        })
        .catch(next)
});

router.post('/', (req, res, next) => {
    const category = new Category(req.body);
    category.save()
        .then((result) => {
        res.send(result)
    })
        .catch(next)
})

module.exports = router