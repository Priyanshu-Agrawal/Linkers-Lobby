const express = require('express');
const router = express.Router();
const Booking = require('./models/Booking');
const authenticateUserToken  = require("../../Auth/authenticateToken");


router.get('/', (req, res) => {
    try{
    Booking.find({})
        .then(result => res.send(result.length ? result : 'No Bookings found'))
        .catch(err => res.send(err));
    }catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

router.post('/', authenticateUserToken ,  async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        const booking = await newBooking.save()
        res.send(booking)
    }catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

router.get('/:id', (req, res) => {
    try {
        Booking.findById(req.params.id)
            .then(result => res.send(result ? result : 'No Booking found'))
            .catch(err => res.send(err));
    }catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router;


