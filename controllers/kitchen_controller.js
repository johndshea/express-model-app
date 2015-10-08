/*  When we include the cat router in server.js, it will be via the command
      server.use('/kitchen', kitchenController);
  Every route below will be prefaced with '/kitchen', so if we define
      router.get('/:id', function (res, req) {});
  it will really be run when we hit '/kitchen/:id'
*/

var express  = require('express'),
    router   = express.Router(),
    menuItem = require('./models/menu_item.js');

router.get('/menu', function (req, res) {
  menuItem.find({}, function (err, menuItems) {
    res.render('kitchen/menu', {
      items: menuItems
    });
  });
});

router.get('/menu/new', function (req, res) {
  res.render('kitchen/new');
});

router.post('/menu', function (req, res) {
  console.log(req.body);
  menuItem.new(req.body.menuItem, function (err, newMenuItem) {
    if (err) {
      res.redirect(302, '/menu/new');
      console.log(err);
    } else {
      res.redirect(302, '/menu');
    }
  });
});

router.get('/menu/:id/edit', function (req, res) {
  menuItem.findbyId({req.params.id}, function (err, menuItems) {
    if (err) {
  		console.log("Retrieval error: ", err);
	} else {
		res.render('kitchen/edit', {
      		item: menuItem
    	});
	}
  });
});

router.patch('/menu/:id', function (req, res) {
  menuItem.findbyIdAndUpdate({req.params.id}, req.body.menuItem, function (err, updatedItem) {
    if (err) {
  		console.log("Editing error: ", err);
	} else {
		res.redirect(302, '/menu');
	}
  });
});

router.delete('/menu/:id', function (req, res) {
    menuItem.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      console.log("Deletion error: ", err);
    } else {
      console.log("Menu item has been removed");
      res.redirect(302, '/menu');
    }
  });
});

module.exports = router;
