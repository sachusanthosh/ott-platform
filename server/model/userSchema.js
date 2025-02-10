const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
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
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },

    watchLater: [
        {
            movieId: {
                type: mongoose.Schema.Types.ObjectId, // Corrected type
                ref: 'Movies'
            }
        }
    ],
    watchHistory: [
        {
            movieId: {
                type: mongoose.Schema.Types.ObjectId, // Corrected type
                ref: 'Movies' // Added reference
            },
            date: {
                type: Date,
                default: Date.now,
            }
        }
    ],
});

const User = mongoose.model('User', userSchema); // Singular name for consistency

module.exports = User;
