var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AllergySchema = require('./allergy');


var MenuItemSchema = new Schema({
  name: String,
  description: String,
  ingredients: Array,
  imageUrl: String,
  allergy: [AllergySchema]
});

module.exports = mongoose.model('Menu_Item', MenuItemSchema);

