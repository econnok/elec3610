// app/routes.js
module.exports = function(app, passport) {

var express = require('express');
var router = express.Router();
var Event = require('../models/kevent');
var moment = require('moment');
var stripe = require("stripe")("pk_test_yZwVlBoQiuGNV4eA7qstjL6P");


	app.use(function(req, res, next) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
	});

moment().format();
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================

	app.get('/', isLoggedIn, function(req, res) {
		res.render('index.ejs', {
			user : req.user // 
		});
	});

	// ======================================
	// INDEX=================================
	// ======================================
		// if successful login then go to meta tutorial page
		app.get('/index', isLoggedIn, function(req, res) {
		res.render('index.ejs', {
			user : req.user // 
		});
	});
	// ===========================================
	// HOST EVENT=================================
	// ===========================================
		// if successful login then go to meta tutorial page
	app.get('/host', isLoggedIn, function(req, res) {
		res.render('host.ejs', {
			user : req.user // 
		});
	});
/*
	app.post('/host', passport.authenticate('local-login', {
		successRedirect : '/index', // redirect to the secure profile section


		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

*/
	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/index', // redirect to the secure profile section


		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/login', // redirect to the secure profile section
		
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	app.post('/signupauth', passport.authenticate('local-signup', {
		successRedirect : '/login', // redirect to the secure profile section
		
		failureRedirect : '/', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.render('authwall.ejs',  { message: req.flash('signupMessage') });
	});
	
	app.get('/retrieve', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('retrieve.ejs');
	});
	//#### EVENTS ROUTES  BEGIN####
	
	
//Pull all records from database
app.get('/eventsrouter', function(req, res){ // listening for people who are using this to talk to server
	console.log("I have recieved a request through the eventssroute");
	Event.find(function (err, docs) {
		if (err) return console.error(err);
		//console.log(docs);
		res.json(docs);
})

}); 
// Post to database
app.post('/eventsrouter', function(req,res){
	console.log("ABOUT TO POST");
	//console.log(req.body);
	
				
	
	console.log(req.body.description);
	var file =  new Event({ title: req.body.title, author: req.body.author , description:req.body.description, date: req.body.date });
	///////////////
	file.save(function (err) {
	
	});
	res.json(0);

});

app.get('/joinprem', isLoggedIn, function(req, res) {

		res.render('joinprem.ejs', {
			user : req.user // 
		});

});

app.post('/charge', function(req, res) {

	var stripeToken = req.body.stripeToken;

	var charge = stripe.charges.create({
		amount: 500, // amount in cents, again
		currency: "usd",
		card: stripeToken,
		description: "PremiumKickaroo"
	}, function(err, charge) {
		if (err && err.type === 'StripeCardError') {
			// The card has been declined
		} else {
			//Render a thank you page called "Charge"
			
			res.render('charge', { title: 'Charge', user : req.user  });
		}
	});

});
app.post('/chargemon', function(req, res) {

	var stripeToken = req.body.stripeToken;

	var charge = stripe.charges.create({
		amount: 500, // amount in cents, again
		currency: "usd",
		card: stripeToken,
		description: "PremiumKickaroo"
	}, function(err, charge) {
		if (err && err.type === 'StripeCardError') {
			// The card has been declined
		} else {
			//Render a thank you page called "Charge"
			
			res.render('chargemon', { title: 'Charge', user : req.user  });
		}
	});

});

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.render('authwall.ejs',  { message: req.flash('signupMessage') });
}

	
	// HERE GOES THE TIMETABLE FUNCTIONS
	
	var writetofile = function(path){
	
		console.log("insidecreatejason");
		//variables to get the contents from the server. 
		var fs = require('fs');
		var http = require('https');
		var jsontable;
		var url = path.path;		
		
		download(url); //2
	};

	var download = function(url,cb) {
	
		var http = require('https');
		var fs = require('fs');

	var file = fs.createWriteStream("file.ics");
	http.get(url, function(response){
	    response.pipe(file);
		console.log("after pipe");
	})
	console.log(" done writing to file ...");	
	};

	
	
	
	
	
	
	
	
	
	
	
	
	

	
	
};







