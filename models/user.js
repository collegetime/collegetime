const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose")

const UserSchema = new Schema({

    username: String,




    password:    String
      




});

UserSchema.plugin(passportLocalMongoose);

module.exports =  mongoose.model('user', UserSchema );
// module.exports = {User: mongoose.model('user', UserSchema )};
