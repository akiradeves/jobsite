const { ObjectId } = require('mongodb');
const aws = require('aws-sdk');
const jwt = require('jsonwebtoken');
const Client = require('node-rest-client').Client;
const fs = require('fs');
const User = require('../models/user');

const dbconfig = require('../config/database');
const pathconfig = require('../config/path.config');
const awsconfig = require('../config/aws.config');

const safeObjectId = s => ObjectId.isValid(s) ? new ObjectId(s) : null;

module.exports = (router) => {
	// middleware - used to grab user's token from headers
	router.use((req, res, next) => {
		const token = req.headers['authorization'];
		if (!token) {
			res.json({ success: false, message: 'No token provided', is_token_error: true });
		} else {
			// verify token is valid
			
			jwt.verify(token, dbconfig.secret, (err, decoded) => {
				// check if error is expired or invalid
				if (err) {
					res.json({ success: false, message: 'Token Invalid: ' + err, is_token_error: true});
				} else {
					req.decoded = decoded;
					next();
				}
			});
		}

		//for test

		// next();
	});

	// route to add new user
	router.post('/add', (req, res) => {
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
						if (!req.body.role) {
							res.json({ success: false, message: 'User role should be provided.' });
						} else {
							if (!req.body.organization) {
								res.json({ success: false, message: 'Organization should be provided.' });
							} else {
								// Check if executor has 'admin' permission
								User.findOne({ _id: req.decoded.userId }, (err, executor) => {
									// Check if error was found
									if (err) {
										res.json({ success: false, message: err });
									} else {
										// Check if executor's id was found in DB
										if (!executor) {
											res.json({ success: false, message: 'Unable to authenticate.' });
										} else {
											// Check executor's role
											if (executor.role.toLowerCase() != 'admin') {
												res.json({ success: false, message: 'Insufficient priviledge to add a user.' });
											} else {
												// Create new user object and apply user input
												let user = new User({
													first_name: req.body.first_name,
													last_name: req.body.last_name,
													email: req.body.email,
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
															res.json({ success: false, message: 'Duplicated Email.', info:user });
														} else {
															res.json({ success: false, message: 'Could not save user. Error: ' + err });
														}
													} else {
														res.json({ success: true, message: 'Added user successfully!' });
													}
												});
											}
										}
									}
								});
							}
							
						}
					}
				}
			}
		}
	});

	// route to get all users
	router.get('/getAll', (req, res) => {
		// Search database for all users
		User.find({})
		.sort({ '_id': -1})
		.exec( function (err, users) {
			
			// Check if error was found or not
			if (err) {
				res.json({ success: false, message: err });
			} else {
				res.json({ success: true, users: users });
			}
		});
	});

	// route to get one user
	router.get('/get/:id', (req, res) => {
		// Check if ID was provided in parameters
		if (!req.params.id) {
			res.json({ success: false, message: 'No id provided.' });
		} else {
			// Find user with id
			User.findOne({ _id: req.params.id }, (err, user) => {
				// If err was found
				if (err) {
					res.json({ success: false, message: err });
				} else {
					// If user was not found
					if (!user) {
						res.json({ success: false, message: 'No user found with id: ' + req.params.id });
					} else {
						res.json({ success: true, user: user });
					}
				}
			});
		}
	});

	// route to delete user
	router.delete('/remove/:id', (req, res) => {
		// Check if ID was provided in parameters
		if (!req.params.id) {
			res.json({ success: false, message: 'No id provided' });
		} else {
			// Check if id is found in database
			User.findOne({ _id: req.params.id }, (err, user) => {
				// Check if error was found
				if (err) {
					res.json( {success: false, message: err});
				} else {
					// Check if user with id was not found
					if (!user) {
						res.json({ success: false, message: 'Unable to find a user with id: ' + req.params.id });	
					} else {
						// Check if executor has a 'admin' permission
						User.findOne({ _id: req.decoded.userId }, (err, executor) => {
							// Check if error was found
							if (err) {
								res.json({ success: false, message: err });
							} else {
								// Check if executor's id is found in DB.
								if (!executor) {
									res.json({ success: false, message: 'Unable to authenticate a user'});				
								} else {
									// Check executor's role
									if (executor.role.toLowerCase() != 'admin') {
										res.json({ success: false, message: 'Not sufficient permission.' });
									} else {
										// Remove the user
										user.remove((err) => {
											if (err) {
												res.json({ success: false, message: err });
											} else {
												res.json({ success: true, message: 'User deleted successfully.' });
											}
										});
									}
								}
							}
						});
					}
				}
			});
		}
	});

	// route to update user
	router.put('/update/:id', (req, res) => {
		// Check if ID was provided in parameters
		if (!req.params.id) {
			res.json({ success: false, message: 'No id provided.' });
		} else {
			// Check if id is found in DB
			User.findOne({ _id: req.params.id }, (err, user) => {
				// Check if error was found
				if (err) {
					res.json({ success: false, message: err });
				} else {
					// Check if user was found
					if (!user) {
						res.json({ success: false, message: 'Unable to find a user with id: ' + req.params.id });
					} else {
						// Check if executor has a 'admin' permission
						User.findOne({ _id: req.decoded.userId }, (err, executor) => {
							// Check if error was found
							if (err) {
								res.json({ success: false, message: err });
							} else {
								// Check if executor's id is found in DB.
								if (!executor) {
									res.json({ success: false, message: 'Unable to authenticate a user'});				
								} else {
									// Check executor's role
									if (executor.role.toLowerCase() != 'admin') {
										res.json({ success: false, message: 'Not sufficient permission.' });
									} else {
										user.first_name = req.body.first_name;
										user.last_name = req.body.last_name;
										user.email = req.body.email;
										user.organization = req.body.organization;
										user.role = req.body.role;
										if (req.body.password && req.body.password.length > 0) {
											user.password = req.body.password;
										}

										// Save user to DB
										user.save((err) => {
											// Check if error is occured
											if (err) {
												// Check if error is an error indicating duplicated account
												if (err.code === 11000) {
													res.json({ success: false, message: 'Duplicated email.', info:user });
												} else {
													res.json({ success: false, message: 'Could not save user. Error: ' + err });
												}
											} else {
												res.json({ success: true, message: 'Updated user successfully!' });
											}
										});
									}
								}
							}
						});
					}
				}
			});
		}
	});

	// // temporary: clear all user
	// router.delete('/removeAll', (req, res) => {
	// 	User.remove({}, (err) => {
	// 		if (err) {
	// 			res.json({ success: false, message: err});
	// 		} else {
	// 			res.json({ success: true, message: 'Removed all user data from DB' });
	// 		}
	// 	});
	// });
	return router;
};