const express = require('express');
const router = express.Router();

const ServiceProvider = require('./models/ServiceProvider');
const User = require("../users/models/User");

router.get('/', (req, res) => {
    ServiceProvider.find({})
        .then(result => res.send(result.length ? result : 'No service providers found'))
        .catch(err => res.send(err));
})

router.post('/', (req, res) => {
    saveServiceProvider(req)
        .then(r => {
            updateUserWithServiceProviderID(req, r)
                .then(r => res.send(r))
                .catch(err => res.status(501).send(err))
        })
        .catch(err => res.status(501).send(err));
})

const saveServiceProvider =async (req) =>{
    const newServiceProvider =  new ServiceProvider(req.body);
    return await newServiceProvider.save();
}

const updateUserWithServiceProviderID = async (req, serviceProvider) => {
     await User.findByIdAndUpdate(req.body.userId, { serviceProvider: serviceProvider._id });
     return serviceProvider ;
}

module.exports = router;