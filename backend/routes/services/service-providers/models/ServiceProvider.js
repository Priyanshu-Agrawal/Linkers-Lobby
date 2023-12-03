const mongoose = require('mongoose');
const User = require("../../users/models/User");


const servicesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

// Define the ServiceProviders schema
const serviceProviderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
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
    services: [servicesSchema],
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

serviceProviderSchema.pre('save', async function (next) {
   const session = await ServiceProvider.startSession();
    session.startTransaction();
    try{
        const user = await User.findById(this.userId);
        if(user) {
            next();
        } else{
            const error = new Error(`Invalid User`);
            error.name = "ValidationError";
            next(error);
        }
    }catch (err) {
        console.log(err)
        next(err)
    }
})


serviceProviderSchema.post(['save','findOneAndUpdate'], async function (doc, next) {
    const session = await ServiceProvider.startSession();
    session.startTransaction();
    try {
        await User.findByIdAndUpdate(doc.userId, {serviceProvider: doc._id})
        await session.commitTransaction();
        console.log("User updated")
    }catch (err) {
        await session.abortTransaction();
        console.log(err)
        await doc.remove();
    }finally {
        await session.endSession();
    }
    next();
})

// Create the ServiceProviders model
const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema);

// Export the model for use in other files
module.exports = ServiceProvider;
