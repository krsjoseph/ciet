var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MenuItemSchema = new Schema({
  name: String,
  description: String,
  ingredients: Array,
  imageUrl: String,
  allergy: Array
});

module.exports = mongoose.model('Menu_Item', MenuItemSchema);

