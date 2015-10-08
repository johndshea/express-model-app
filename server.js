//excellent folder organization derived from Shorty's express model app (Matt Short)
// include packages profusely
var express         = require('express'),
    server          = express(),
    ejs             = require('ejs'),
    expressLayouts  = require('express-ejs-layouts'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    morgan          = require('morgan'),
    session 		= require('express-session');
    url            = 'mongodb://localhost:27017/test',
    // router 			= require('router'),
// var menuItem    	= require('./models/menu_item.js'),
// 	order			= require('./models/order.js');

// use outside controllers
var counterController = require('./controllers/counter_controller.js');
server.use('/counter', counterController);
var kitchenController = require('./controllers/kitchen_controller.js');
server.use('/kitchen', kitchenController);

// render views from views folder via ejs, connect to mongoose, log profusely
server.set('views', './views');
server.set('view engine', 'ejs');
mongoose.set('debug', true);
mongoose.connect(url);

// serve static files from public
server.use(express.static('./public'));

// log ALL THE THINGS!!!
server.use(morgan('dev'));

// parse strings into pretty things
server.use(bodyParser.urlencoded({ extended: true }));

// Override methods profusely
server.use(methodOverride("_method"));

// All views are rendered into layout.ejs with individual views in <%- body %>
server.use(expressLayouts);

// write server specific controllers
server.listen(3000, function () {
  console.log("Restaurant is open at 3000");
});
