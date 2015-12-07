// server.js

// BASE SETUP
// =============================================================================

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/local'); // connect to our database

var Bear = require('../project/models/bear');
var Medication = require('../project/models/medication');
var Prescription = require('../project/models/prescription');
var Tracking = require('../project/models/tracking');
var User = require('../project/models/user');

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
   res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


//FOR MEDICATIONS
router.route('/medications')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var medication = new Medication(req.body); 

        // save the bear and check for errors
        medication.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Medication is created!' });
        });
         })

    .get(function(req, res) {
        Medication.find(function(err, medications) {
            if (err)
                res.send(err);

            res.json(medications);
        });
        });

// more routes for our API will happen here
router.route('/medications/:medication_id')
// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Medication.findById(req.params.medication_id, function(err, medication) {
            if (err)
                res.send(err);
            res.json(medication);
        });
    })

    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Medication.findById(req.params.medication_id, function(err, medication) {

            if (err)
                res.send(err);

            for (prop in req.body) {
      medication[prop] = req.body[prop];
    }

            // save the bear
            medication.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Medication is updated!' });
            });
        });
    })
    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Medication.remove({
            _id: req.params.medication_id
        }, function(err, medication) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
        });

    //FOR USERS
router.route('/users')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var user = new User(req.body);    

        // save the bear and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User is created!' });
        });
         })

    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
        });

// more routes for our API will happen here
router.route('/users/:user_id')
// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })

    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        User.findById(req.params.user_id, function(err, user) {

            if (err)
                res.send(err);

            for (prop in req.body) {
      user[prop] = req.body[prop];
    }


            // save the bear
            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'User is updated!' });
            });
        });
    })
    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
        });

//FOR TRACKING
router.route('/trackings')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var tracking = new Tracking(req.body);  

        // save the bear and check for errors
        tracking.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Tracking is created!' });
        });
         })

    .get(function(req, res) {
        Tracking.find(function(err, trackings) {
            if (err)
                res.send(err);

            res.json(trackings);
        });
        });

// more routes for our API will happen here
router.route('/trackings/:tracking_id')
// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Tracking.findById(req.params.tracking_id, function(err, tracking) {
            if (err)
                res.send(err);
            res.json(tracking);
        });
    })

    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Tracking.findById(req.params.tracking_id, function(err, tracking) {

            if (err)
                res.send(err);
   for (prop in req.body) {
      tracking[prop] = req.body[prop];
    }

            // save the bear
            tracking.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Tracking is updated!' });
            });
        });
    })
    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Tracking.remove({
            _id: req.params.tracking_id
        }, function(err, tracking) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
        });

    //FOR PRESCRIPTION
router.route('/trackings')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var prescription = new Prescription(req.body);
    

        // save the bear and check for errors
        prescription.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Prescription is created!' });
        });
         })

    .get(function(req, res) {
        Prescription.find(function(err, prescriptions) {
            if (err)
                res.send(err);

            res.json(prescriptions);
        });
        });

// more routes for our API will happen here
router.route('/prescriptions/:prescription_id')
// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Prescription.findById(req.params.prescription_id, function(err, prescription) {
            if (err)
                res.send(err);
            res.json(prescription);
        });
    })

    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Prescription.findById(req.params.prescription_id, function(err, prescription) {

            if (err)
                res.send(err);

            for (prop in req.body) {
      prescription[prop] = req.body[prop];
    }


            // save the bear
            prescription.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Prescription is updated!' });
            });
        });
    })
    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Prescription.remove({
            _id: req.params.prescription_id
        }, function(err, prescription) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
        });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);