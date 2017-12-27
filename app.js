// importing modules
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');

const mongoose = require('mongoose');
const config = require('./server/config/database');

const router = express.Router();

var auth = require('./server/routes/auth')(router);
var user = require('./server/routes/user')(router);
var mailer = require('./server/routes/mailer')(router);

mongoose.Promise = global.Promise;
console.log(config.server + config.db);
mongoose.connect(config.server + config.db, (err) => {
	if (err) {
		console.log('Could NOT connect to database: ', err);
	} else {
		console.log('Connected to database: ' + config.db);
	}
});

var app = express();

// port no
const port = 3000;

// adding middleware - cors
app.use(cors());

// adding middleware - fileupload
app.use(fileUpload());

// body-parser
app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());

// static files
app.use('/backend', express.static(path.join(__dirname, 'backend')));
app.use(express.static(path.join(__dirname, 'public')));

// test server
app.get('/test', (req, res) => {
	res.send('Server is running');
});

// authentication
app.use('/auth', auth);

// user apis
app.use('/user', user);

// mailer apis
app.use('/mailer', mailer);

app.listen(process.env.PORT || port, () => {
	console.log('Server started at port:' + port);
});
