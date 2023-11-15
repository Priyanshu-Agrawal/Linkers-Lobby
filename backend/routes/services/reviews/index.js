const express = require('express');
const router = express.Router();
const Review = require('./models/Review');

router.get('/', (req, res) => {
    Review.find({})
        .then(result => res.send(result.length ? result : 'No reviews found'))
        .catch(err => res.send(err));
})

router.post('/', (req, res) => {
    const newReview = new Review(req.body);
    newReview.save()
        .then(r => {
         res.send(r)
    })
})

module.exports = router;


