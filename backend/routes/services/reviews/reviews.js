const express = require('express');
const reviewsRouter = express.Router();
const Review = require('./models/Review');

reviewsRouter.get('/', (req, res) => {
    Review.find({})
        .then(result => res.send(result.length ? result : 'No reviews found'))
        .catch(err => res.send(err));
})

reviewsRouter.post('/', (req, res) => {
    const newReview = new Review(req.body);
    newReview.save()
        .then(r => {
         res.send(r)
    })
})

module.exports = reviewsRouter;


