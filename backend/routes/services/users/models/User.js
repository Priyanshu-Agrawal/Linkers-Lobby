const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the Users schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        // Additional profile information can be added here
        type: Object,
    },
    serviceProvider: {
        // Reference to the ServiceProviders collection
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceProvider',
    },
    givenReviews: [{
        // Reference to the Reviews collection
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
});

//password hashing and salting

userSchema.pre('save', async function (next) {
    try{
        const salt = await bcrypt.genSalt(+ process.env.SALT_ROUNDS);
        this.password = await bcrypt.hash(this.password, salt); //hashed password //throwing error
        next();
    }catch (err){
        console.log(err);
        next(err);
    }
})


// Create the Users model
const User = mongoose.model('User', userSchema);

// Export the model for use in other files
module.exports = User;
