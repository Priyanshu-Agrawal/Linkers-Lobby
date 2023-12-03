const mongoose = require('mongoose');

// Define the Categories schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    providers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceProvider',
    }],
});

// Create the Categories model
const Category = mongoose.model('Category', categorySchema);

// Export the model for use in other files
module.exports = Category;