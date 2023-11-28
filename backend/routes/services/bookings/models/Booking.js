const mongoose = require("mongoose");
const User  =  require("../../users/models/User");
const ServiceProvider = require("../../service-providers/models/ServiceProvider");

const BookingStatusSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'rejected', 'canceled', 'completed'],
        default: 'pending',
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
    },
})

const BookingSchema = new mongoose.Schema({
    serviceProviderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceProvider',
        required: true,
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bookingTime: {
        type: Date,
        required: true,
    },
    bookingStatus: {
        type: BookingStatusSchema,
        required: true,
    },
    serviceLocation: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    description: {
        type: String,
        required: true,
    },
},{
    timestamps: true,
})

BookingSchema.index({ serviceProviderId: 1, clientId: 1, bookingTime: 1 }, { unique: true });

BookingSchema.pre('save', async function (next) {
    try {
        const booking = this;
        const serviceProvider = await ServiceProvider.findById(booking.serviceProviderId);
        const client = await User.findById(booking.clientId);
        const existingBooking = await Booking.findOne({
            serviceProviderId: booking.serviceProviderId,
            clientId: booking.clientId,
            bookingTime: booking.bookingTime
        });
        if (serviceProvider && client && !existingBooking) {
            next();
        } else {
            const error = new Error(`Invalid ${!serviceProvider ? 'Service Provider' : !client ? 'Client' : 'Booking'}}`);
            error.name = "ValidationError";
            next(error);
        }
    } catch (err) {
        console.log(err)
        next(err)
    }
})


BookingSchema.post('save', async function (doc){
    const session = await Booking.startSession();
    session.startTransaction();
    try {
        await User.findByIdAndUpdate(doc.clientId, {$push: {bookings: doc._id}}, {new: true, session})
        await ServiceProvider.findByIdAndUpdate(doc.serviceProviderId, {$push: {servicesBooked: doc._id}}, {new: true, session})
        await session.commitTransaction();
    }catch (err) {
        await session.abortTransaction();
        console.log("error", err);
        await doc.remove();
    }finally {
        await session.endSession();
    }
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;