const express = require('express');
const router = express.Router();
const ServiceProvider = require('./models/ServiceProvider');
const authenticateUserToken = require("../../Auth/authenticateToken");

router.get('/', (req, res) => {
    ServiceProvider.find({})
        .then(result => res.send(result.length ? result : 'No service providers found'))
        .catch(err => res.send(err));
})

router.post('/', authenticateUserToken, (req, res) => {
    const newServiceProvider = new ServiceProvider(req.body);
    newServiceProvider.save()
        .then(result => {
            res.send(result)
        })
    /*saveServiceProvider(req)
        .then(r => {
            updateUserWithServiceProviderID(req, r)
                .then(r => res.send(r))
                .catch(err => res.status(501).send(err))
        })
        .catch(err => res.status(501).send(err));*/
})


router.get('/:serviceProviderId', (req, res) => {
    ServiceProvider.findOne({ _id: req.params.serviceProviderId })
        .then(result => res.send(result ? result : 'No service provider found'))
        .catch(err => res.send(err));
})

router.post('/:serviceProviderId', authenticateUserToken, (req, res) => {
   const existingServiceProvider = ServiceProvider.findOne({ _id: req.params.serviceProviderId });
    if(!existingServiceProvider) return res.status(404).send('No service provider found');
    ServiceProvider.findByIdAndUpdate(req.params.serviceProviderId, { $set: req.body }, { new: true })
        .then(result => res.send(result))
})

// const saveServiceProvider =async (req) =>{
//     const newServiceProvider =  new ServiceProvider(req.body);
//     return await newServiceProvider.save();
// }
//
// const updateUserWithServiceProviderID = async (req, serviceProvider) => {
//      await User.findByIdAndUpdate(req.body.userId, { serviceProvider: serviceProvider._id });
//      return serviceProvider ;
// }

module.exports = router;