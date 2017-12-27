const { ObjectId } = require('mongodb');
const aws = require('aws-sdk');
const jwt = require('jsonwebtoken');
const Client = require('node-rest-client').Client;
const fs = require('fs');
const User = require('../models/user');

const dbconfig = require('../config/database');
const pathconfig = require('../config/path.config');
const awsconfig = require('../config/aws.config');
const nodemailer = require('nodemailer');

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
	});

	// route to add new user
	router.post('/invite', (req, res) => {
        // Check required info are provided
        email = req.body.email;
		if (!email) {
			res.json({ success: false, message: 'Email should be provided.'});
        } else{

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'test@gmail.com',
                    pass: 'password'
                }
            });
        
            // setup email data with unicode symbols
            let mailOptions = {
                from: 'id-haystack', // sender address
                to: email, // list of receivers
                subject: 'Invitation', // Subject line
                html: '<b>Hello world?</b>' // html body
            };
        
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.json({ success: false, message: error });
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                res.json({ success: true, message: "message have sent" });
            });
        }
	});

	return router;
};