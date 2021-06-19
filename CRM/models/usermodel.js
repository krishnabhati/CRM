const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : { type: String, trim: true },
    email : { type: String, trim: true },
    password: { type: String, trim: true },
    mobile : { type: String, trim: true },
    countryCode : { type:String, trim: true },
    usertype:{type:Number,default:2}//user=2 admin = 1
});

module.exports = mongoose.model('user', UserSchema)