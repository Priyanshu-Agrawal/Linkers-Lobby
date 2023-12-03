const mongoose = require("mongoose");
const User  =  require("../../users/models/User");
const ServiceProvider = require("../../service-providers/models/ServiceProvider");

const ReviewSchema = new mongoose.Schema({
    client: {
        name: {
            type: String,
            required: true,
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    serviceProviderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceProvider',
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
    },
},{
    timestamps: true,
})


ReviewSchema.index({ serviceProviderId: 1, userId: 1}, { unique: true });

ReviewSchema.pre('save', async function (next) {
    try{
        const review = this;
        const serviceProvider = await ServiceProvider.findById(review.serviceProviderId);
        const user = await User.findById(review.userId);
        const existingReview = await Review.findOne({
            userId: review.userId,
            serviceProviderId: review.serviceProviderId,
        });
        if(serviceProvider && user && !existingReview) {
            next();
        } else{
            const error = new Error(`Invalid ${!serviceProvider ? "Service Provider" : !user ? "User" : "Review"}`);
            error.name = "ValidationError";
            next(error);
        }
    }catch (err) {
        console.log(err)
        next(err)
    }
})

ReviewSchema.post('save', async function (doc) {
    const session = await Review.startSession();
    session.startTransaction();
    try {
        await User.findByIdAndUpdate(doc.userId, { $push: { givenReviews: doc._id }})
        await ServiceProvider.findByIdAndUpdate(doc.serviceProviderId, { $push: { reviews: doc._id }})
        await session.commitTransaction();
    }catch (err) {
        await session.abortTransaction();
        console.log(err)
        await doc.remove();
    }finally {
        await session.endSession();
    }
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;