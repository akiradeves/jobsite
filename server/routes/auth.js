const jwt = require('jsonwebtoken');
const dbconfig = require('../config/database');
const pathconfig = require('../config/path.config');
const User = require('../models/user');
const fs = require('fs');

module.exports = (router) => {
	// route to back-end sign in
	router.post('/login_backend', (req, res) => {
		if (!req.body.email) {
			res.json({ success: false, message: "No email was provided."});
		} else {
			if (!req.body.password) {
				res.json({ success: false, message: "No password was provided."});
			} else {
				User.findOne({ email: req.body.email }, (err, user) => {
					// Check if error was found
					if (err) {
						res.json({ success: false, message: err });
					} else {
						// Check if email is found
						if (!user) {
							res.json({ success: false, message: 'Email is not found.'});							
						} else {
							const validPassword = user.comparePassword(req.body.password);

							// Check if password matches
							if (!validPassword) {
								res.json({ success: false, message: 'Password invalid' });
							} else {
								if (user.role.toLowerCase() != 'admin') {
									res.json({ success: false, message: "You don't have permission to access back-end." });
								} else {
									const token = jwt.sign({ userId: user._id}, 
										dbconfig.secret, 
										{ expiresIn: '24h' });
									res.json({ success: true, message: "Success!", token: token, user: {mobile: user.mobile_phone, photo:user.photo, _id: user._id, role:'Admin'}});
								}
							}
						}
					}
				});		
			}
		}
	});

	// route to normal sign in
	router.post('/login', (req, res) => {
		if (!req.body.email) {
			res.json({ success: false, message: "No user email was provided."});
		} else {
			if (!req.body.password) {
				res.json({ success: false, message: "No password was provided."});
			} else {
				User.findOne({ email: req.body.email }, (err, user) => {
					// Check if error was found
					if (err) {
						res.json({ success: false, message: err });
					} else {
						// Check if email is found
						if (!user) {
							res.json({ success: false, message: 'Email is not found.'});							
						} else {
							const validPassword = user.comparePassword(req.body.password);

							// Check if password matches
							if (!validPassword) {
								res.json({ success: false, message: 'Password invalid' });
							} else {
								const token = jwt.sign({ userId: user._id}, 
									dbconfig.secret, 
									{ expiresIn: '24h' });

								res.json({ success: true, message: "Success!", token: token, user: {email: user.email, _id: user._id, role: user.role}});
							}
						}
					}
				});		
			}
		}
	});

	// route to register new user
	router.post('/register', (req, res) => {
		// Check required info are provided
		if (!req.body.email) {
			res.json({ success: false, message: 'Email should be provided.'});
		} else {
			if (!req.body.first_name) {
				res.json({ success: false, message: 'First name should be provided' });				
			} else {
				if (!req.body.last_name) {
					res.json({ success: false, message: 'Last name should be provided.'});
				} else {
					if (!req.body.password) {
						res.json({ success: false, message: 'Password should be provided.' });
					} else {
						if (!req.body.organization) {
							res.json( {success: false, message: 'Organization should be provided.' });
						} else {
							// Create new user object and apply user input
							let user = new User({
								email: req.body.email,
								first_name: req.body.first_name,
								last_name: req.body.last_name,
								organization: req.body.organization,
								password: req.body.password,
								role: req.body.role
							});

							// Save user to DB
							user.save((err) => {
								// Check if error is occured
								if (err) {
									// Check if error is an error indicating duplicated account
									if (err.code === 11000) {
										console.log(err);
										res.json({ success: false, message: 'Duplicated Email.', info:user });
									} else {
										res.json({ success: false, message: 'Could not save user. Error: ' + err });
									}
								} else {
									res.json({ success: true, message: 'Registered user successfully!' });
								}
							});
						}
					}
				}
			}
		}
	});
	return router;
};