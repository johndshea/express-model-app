/* need to include mongoose in this file */
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/* El Schema!!! */
var menuSchema = new Schema({
  name: {type: String, required: true},
  price: {type: Number, required: true},
  currentStock: Number,
  description: String,
}, {collection: 'menu_items', strict: true});

/* experimental, just-might-work prototype methods */
menuSchema.methods.disable = function () {
  	this.currentStock = 0;
    return this;
};

menuSchema.methods.updateStock = function () {
    this.currentStock -= 1;
    return this;
};

/* this is the actual model */
var menuItem = mongoose.model('menuItem', menuSchema);

/* exporting the model, rather than an object */
module.exports = menuItem;