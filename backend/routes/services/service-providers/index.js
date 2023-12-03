const express = require('express');
const router = express.Router();
const ServiceProvider = require('./models/ServiceProvider');
const authenticateUserToken = require("../../Auth/authenticateToken");

router.get('/', (req, res) => {
    try {
        const query = {};
        if (req.query.category) {
            query.category = req.query.category;
        }
        if (req.query.location) {
            query.location = {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(req.query.location.split(',')[0]), parseFloat(req.query.location.split(',')[1])],
                    },
                    $maxDistance: 10000, // Adjust the max distance as needed (in meters)
                },
            };
        }
        ServiceProvider.find(query)
            .then(result => res.send(result.length ? result : 'No service providers found'))
            .catch(err => res.send(err));
    } catch (err) {
        res.status(500).send(err);
    }
})

router.post('/', authenticateUserToken, (req, res) => {
    try {
        const newServiceProvider = new ServiceProvider(req.body);
        newServiceProvider.save()
            .then(result => {
                res.send(result)
            })
    } catch (err) {
        res.status(500).send(err);
    }
    /*saveServiceProvider(req)
        .then(r => {
            updateUserWithServiceProviderID(req, r)
                .then(r => res.send(r))
                .catch(err => res.status(501).send(err))
        })
        .catch(err => res.status(501).send(err));*/
})


router.get('/:serviceProviderId', (req, res) => {
    try {
        ServiceProvider.findOne({_id: req.params.serviceProviderId})
            .then(result => res.send(result ? result : 'No service provider found'))
            .catch(err => res.send(err));
    } catch (err) {
        res.status(500).send(err);
    }
})

router.post('/:serviceProviderId', (req, res) => {
    try {
        const existingServiceProvider = ServiceProvider.findOne({_id: req.params.serviceProviderId});
        if (!existingServiceProvider) return res.status(404).send('No service provider found');
        ServiceProvider.findByIdAndUpdate(req.params.serviceProviderId, {$set: req.body}, {new: true})
            .then(result => res.send(result))
    } catch (err) {
        res.status(500).send(err);
    }
})







const mumbaiLocation = {
    type: 'Point',
    coordinates: [72.8777, 19.0760],
};

router.get('/mumbai',  (req, res) => {
    ServiceProvider.find({
        location: {
            $near: {
                $geometry: mumbaiLocation,
                $maxDistance: 10000,
            },
        },
    })
        .then(result => res.send(result))
        .catch(err => {
            console.error('Error in MongoDB query:', err);
            res.status(400).send(err);
        });
})
module.exports = router;