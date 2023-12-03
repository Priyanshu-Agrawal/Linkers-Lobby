const express = require('express');
const router = express.Router();
const Review = require('./models/Review');
const authenticateUserToken  = require("../../Auth/authenticateToken");


router.get('/', (req, res) => {
    Review.find({})
        .then(result => res.send(result.length ? result : 'No reviews found'))
        .catch(err => res.send(err));
})

router.post('/', authenticateUserToken ,  async (req, res) => {
    try{
        const newReview = new Review(req.body);
        const review = await newReview.save()
        res.send(review)
    }catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})


router.get('/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        res.send(review ?? 'No review found');
    } catch (err) {
        res.status(500).send(err);
    }
})

router.post('/:id', authenticateUserToken , async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.send(review ?? 'No review found');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;


