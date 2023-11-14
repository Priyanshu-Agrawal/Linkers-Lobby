const mongoose = require('mongoose');

// Define the ServiceProviders schema
const serviceProviderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
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

// Create the ServiceProviders model
const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema);

// Export the model for use in other files
module.exports = ServiceProvider;
