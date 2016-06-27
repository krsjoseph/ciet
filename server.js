var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set the port

var mongoose = require('mongoose');
mongoose.connect('mongodb://krsjoseph:krsjoseph@ds021984.mlab.com:21984/ciet'); // connect to our database (I know this is horrible practice )


var Menu_Item = require('./app/models/menu_item');
var Allergy = require('./app/models/allergy');
var User = require('./app/models/user');


var router = express.Router(); // get an instance of the express Router


var config = {
  "secrets" : {
    "clientId" : "CLIENT_ID",
    "clientSecret" : "CLIENT_SECRET",
    "redirectUrl" : "REDIRECT_URL"
  }
}


router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening. This can be good or bad');
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({
    message: 'Krs you\'re awesome'
  });
});


// Menu Item Routes

router.route('/menu_items')

.post(function(req, res) {

  var menu_item = new Menu_Item();
  menu_item.name = req.body.name;


  menu_item.save(function(err) {
    if (err)
      res.send(err);

    res.json({
      message: 'Menu Item created!'
    });
  });
})

.get(function(req, res) {
  Menu_Item.find(function(err, menu_items) {
    if (err)
      res.send(err);

    res.json(menu_items);
  });
});


router.route('/menu_items/:menu_item_id')

.get(function(req, res) {
  Menu_Item.findById(req.params.menu_item_id, function(err, menu_item) {
    if (err)
      res.send(err);
    res.json(menu_item);
  });
})


.put(function(req, res) {
  Menu_Item.findById(req.params.menu_item_id, function(err, menu_item) {
    if (err)
      res.send(err);

    menu_item.name = req.body.name;
    menu_item.save(function(err) {
      if (err)
        res.send(err);

      res.json({
        message: 'Menu Item updated!'
      });
    });

  });
})

.delete(function(req, res) {
  Menu_Item.remove({
    _id: req.params.menu_item_id
  }, function(err, menu_item) {
    if (err)
      res.send(err);
    res.json({
      message: 'Successfully deleted'
    });
  });
});




//Allergy Routes
router.route('/allergies')

    .post(function(req, res) {

      var allergy = new Allergy();
      allergy.name = req.body.name;

      allergy.save(function(err) {
        if (err)
          res.send(err);

        res.json({
          message: 'Allergy created!'
        });
      });
    })

    .get(function(req, res) {
      Allergy.find(function(err, allergies) {
        if (err)
          res.send(err);

        res.json(allergies);
      });
    });



//User Routes
router.route('/users')

    .post(function(req, res) {

      var user = new User();
      user.name = req.body.name;
      user.email = req.body.email;

      user.save(function(err) {
        if (err)
          res.send(err);

        res.json({
          message: 'User created!'
        });
      });
    })

    .get(function(req, res) {
      User.find(function(err, users) {
        if (err)
          res.send(err);

        res.json(users);
      });
    });




// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
