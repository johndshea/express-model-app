//TODO: finish total method, 'cause it ain't done!

/* need to include mongoose in this file */
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/* El Schema!!! */
var orderSchema = new Schema({
  //number: generated unique order number
  items: Array,
}, {collection: 'orders', strict: true});

/* experimental, just-might-work prototype methods */

orderSchema.methods.total = function () {
  	var sum = 0; 
  	// find each menu item by id, look up price, add to sum
    return sum;
};

orderSchema.methods.tip = function () {
    return this.total() * 0.15;
};

// orderSchema.methods.generateOrderNumber = function () {
//   	this.currentStock = 0;
//     return this;
// };

/* this is the actual model */
var order = mongoose.model('order', orderSchema);

/* exporting the model, rather than an object */
module.exports = order;