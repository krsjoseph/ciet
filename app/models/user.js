var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema  = new Schema({
    name: String,
    email: String,
    pref: Array
});

module.exports = mongoose.model('User', UserSchema);

