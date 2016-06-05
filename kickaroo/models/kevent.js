// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var KeventSchema  = mongoose.Schema({
		title        : String,
		description    	: String,
		date        : String,
		sport: String,
		location: String,
		author: String,
});




// create the model for users and expose it to our app
module.exports = mongoose.model('Kevent', KeventSchema);
