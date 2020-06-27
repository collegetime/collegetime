const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({

    author: {
        type: String,
        required: true
    },
    LinkedIn: {
        type: String,
        required: true
    },
    Instagram: {
        type: String,
        required: true
    },
    autphoto: {
        type: String,
        default: ''
    },

});

module.exports =  mongoose.model('author', AuthorSchema);
