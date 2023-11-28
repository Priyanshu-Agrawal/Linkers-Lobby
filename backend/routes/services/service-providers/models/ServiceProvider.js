const mongoose = require('mongoose');
const User = require("../../users/models/User");

// Define the ServiceProviders schema
const serviceProviderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    location: {
        type: {
            type: String,
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
        },
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    services: [{
        type: String,
        required: true,
    }],
    servicesBooked: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
    }],
    portfolio: [{
        type: String, // Assuming these are URLs to images
    }],
    pricing: {
        type: String, // You might want to use a more detailed pricing structure
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
});

serviceProviderSchema.index({ location: '2dsphere' });

serviceProviderSchema.post(['save','findOneAndUpdate'], async function (doc, next) {
    !doc && next();
    const session = await ServiceProvider.startSession();
    session.startTransaction();
    try {
        await User.findByIdAndUpdate(doc.userId, {serviceProvider: doc._id})
        await session.commitTransaction();
    }catch (err) {
        await session.abortTransaction();
        console.log(err)
        await doc.remove();
    }finally {
        await session.endSession();
    }
})

// Create the ServiceProviders model
const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema);

// Export the model for use in other files
module.exports = ServiceProvider;
