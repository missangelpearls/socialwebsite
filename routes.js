'use strict';

//Middleware
const check = require('./middleware/check');

//Controllers
const userController = require('./controllers/userController');

const eventController = require('./controllers/eventController'); //added 

module.exports = function(app,passport) {
	app.get('/', function(req, res){
		res.render('index');
	});

	app.get('/auth', userController.getAuth);
	app.get('/auth/facebook', passport.authenticate('facebook',{ scope : 'email' }));
	app.get('/auth/facebook/callback',   passport.authenticate('facebook', {successRedirect : '/home',failureRedirect : '/auth'}));

	app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

	app.get('/privacy-policy', function(req, res){
		res.render('privacy');
	});

	app.get('/terms', function(req, res){
		res.render('terms');
	});

	app.get('/share', function(req, res){
		res.render('share'); 
	});

	app.get('/connect', function(req, res){
		res.render('connect'); 
	});

	app.get('/home', require('connect-ensure-login').ensureLoggedIn('/'), check, function(req, res){
		res.redirect('/explore')
	});
	app.get('/explore', function(req, res){
		res.render('explore'); 
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});



	app.get('/profile/create',require('connect-ensure-login').ensureLoggedIn('/'), userController.getCreateProfile);
	app.post('/profile/create',require('connect-ensure-login').ensureLoggedIn('/'), userController.postCreateProfile);


	// app.get('/explore', require('connect-ensure-login').ensureLoggedIn('/'), check, userController.explore);

	app.get('/profile/:pid', require('connect-ensure-login').ensureLoggedIn('/'), check, userController.showProfile);
	
	//Create Event
	app.get('/events/create', require('connect-ensure-login').ensureLoggedIn('/') ,function(req,res){
		res.render('create_event');
	});
	app.post('/events/create', require('connect-ensure-login').ensureLoggedIn('/'),check,eventController.createEvent);
		
//Event Page save run
	app.get('/events', require('connect-ensure-login').ensureLoggedIn('/'),check, eventController.getEvents);

	//Edit Events done save restart
	app.get('/events/:eid/edit', require('connect-ensure-login').ensureLoggedIn('/') ,check, eventController.editEvent);
	app.post('/events/:eid/edit', require('connect-ensure-login').ensureLoggedIn('/'),check, eventController.SaveEditEvent);

	app.get('/chats', function(req, res){
		res.render('videochat'); 
	});

}
