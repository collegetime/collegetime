const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({

    message: {
        type: String,
        required: true
    },


//this is the user post who created it
    name: {
        type: String,
        default: true
    },

    id: {
        type: String,
        default: true
    },


//comment if selected
    subject: {
        type: String,
        default: true
    }


});

module.exports =  mongoose.model('contact', ContactSchema);
// module.exports = {Comment: mongoose.model('comment', CommentSchema)};
