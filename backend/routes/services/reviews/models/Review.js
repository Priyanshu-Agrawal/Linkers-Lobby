const mongoose = require("mongoose");
const User  =  require("../../users/models/User");
const ServiceProvider = require("../../service-providers/models/ServiceProvider");

const ReviewsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    serviceProviderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceProvider',
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
    },
},{
    timestamps: true,
})

ReviewsSchema.post('save', async (doc) => {
    await User.findByIdAndUpdate(doc.userId, { $push: { givenReviews: doc._id }})
    await ServiceProvider.findByIdAndUpdate(doc.serviceProviderId, { $push: { reviews: doc._id }})
});

const Review = mongoose.model("Reviews", ReviewsSchema);

module.exports = Review;