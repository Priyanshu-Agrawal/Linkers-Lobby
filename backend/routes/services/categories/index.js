const express = require("express");
const router = express.Router();
require('dotenv').config();
const Category = require('./models/category');



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


router.get('/:id', (req, res, next) => {
    Category.findById(req.params.id)
        .then((result) => {
            res.send(result)
        })
        .catch(next)
});

module.exports = router