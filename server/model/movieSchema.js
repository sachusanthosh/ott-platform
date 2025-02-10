const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    discription: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    }
});

const Movie = mongoose.model('Movies', movieSchema);

module.exports = Movie;