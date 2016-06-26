var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AllergySchema  = new Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('Allergy', AllergySchema);

