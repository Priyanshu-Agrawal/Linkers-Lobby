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

module.exports = router;


