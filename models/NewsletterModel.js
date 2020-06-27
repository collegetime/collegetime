const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MailSchema = new Schema({

    mail: {
        type: String,
        required: true
    }


});

module.exports =  mongoose.model('newsletter', MailSchema);
