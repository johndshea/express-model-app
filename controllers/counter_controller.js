/*  When we include the cat router in server.js, it will be via the command
      server.use('/kitchen', kitchenController);
  Every route below will be prefaced with '/kitchen', so if we define
      router.get('/:id', function (res, req) {});
  it will really be run when we hit '/kitchen/:id'
*/

var express  = require('express'),
    router   = express.Router(),
    order    = require('./models/order.js');

router.get('/orders', function (req, res) {
  order.find({}, function (err, orders) {
    res.render('counter/orders', {
   		orders: orders
    });
  });
});

router.get('/orders/new', function (req, res) {
  res.render('counter/new');
});

router.post('/orders', function (req, res) {
  console.log(req.body);
  order.new(req.body.order, function (err, newMenuItem) {
    if (err) {
      res.redirect(302, '/menu/new');
      console.log(err);
    } else {
      res.redirect(302, '/menu');
    }
  });
});

router.get('/:id/edit', function (req, res) {
  order.findbyId({req.params.id}, function (err, morder) {
    if (err) {
  		console.log("Retrieval error: ", err);
	} else {
		res.render('kitchen/edit', {
      		item: order
    	});
	}
  });
});

router.patch('/menu/:id', function (req, res) {
  order.findbyIdAndUpdate({req.params.id}, req.body.menuItem, function (err, updatedItem) {
    if (err) {
  		console.log("Editing error: ", err);
	} else {
		res.redirect(302, '/menu');
	}
  });
});

router.delete('/menu/:id', function (req, res) {
    order.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      console.log("Deletion error: ", err);
    } else {
      console.log("Menu item has been removed");
      res.redirect(302, '/menu');
    }
  });
});

module.exports = router;
