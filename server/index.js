/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import express from 'express';
import https from 'https';

// Now import some basic middleware for express
import session from 'express-session';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';

// Now import the routes
import * as routes from './routes';

// Import useful file IO
import * as fs from 'fs';

// React elements
//import React from 'react';
//import ReactDOMServer from 'react-dom/server';
import jsxEngine from 'express-react-views';
// Set up debug for development
import Debug from 'debug';


// Authentication
import passport from 'passport';
import './config/passport';  // Nb. this import runs the passport configuration

// MongoDb
import mongoose from 'mongoose';

// Initial page to send
//import Index from './views/Index';

// Now load up any config
import app_cfg from './config/app.json';
import db_cfg from './config/db.json';
import session_cfg from './config/session.json';

// Set the environment setting we are using
let env = !process.env.NODE_ENV ? app_cfg.defaultEnv : process.env.NODE_ENV;
let dbURL = !process.env.MONGO_URL ? db_cfg.mongourl : process.env.MONGO_URL;

// Set the application and the variables it uses
let app					= express();			// This app
let port		 		= env == 'production' ? app_cfg.port : app_cfg.devPort;	// The default port for the app
let shutdown			= false;				// Flag to see if we are shutting down
let startup				= true;					// Flag to show we are starting up

// Intercept any connection attempts while we are starting up
app.use(function (req, res, next) {
	if (!startup) return next();

	res.setHeader('Connection', 'close');
	res.status(503).send('Service is in the process of starting.');
});

// Set debug if it was not set
if (process.env.DEBUG == null) {
	switch (env) {
	case 'development':
		Debug.enable('*');
		break;
	case 'production':
		Debug.disable();
		break;
	default:
		Debug.enable('*');
		env = 'development';
		break;
	}
}
let debug = Debug('server');
debug('The env is set to: ' + env);

// MONGO DB Setup
// connect to the db
mongoose.connect(dbURL, { useNewUrlParser: true }, function onMongooseError(err) {
	if (err) {
		console.log('Error connecting to MongoDB ' + JSON.stringify(err));
		throw err;
	}
});


// Now configure the application
debug('Setting favicon');
app.use(favicon(__dirname + '/images/favicon.ico'));

//app.use(cookieParser());			// Read cookies (needed for auth)
debug('Setting body parser url encoded and json');
app.use(bodyParser.urlencoded({		// Needed for html forms
	limit: app_cfg.urlEncodeMax, extended: false
}));
app.use(bodyParser.json({			// Stop over stuffing of JSON
	limit: app_cfg.jsonMax
}));

// configure the stuff for passport auth
debug('Setting session and security');
app.use(session(session_cfg));
app.use(passport.initialize());
app.use(passport.session());

// Now set up the initial view
debug('Set basic view');
app.set('view engine', 'jsx');
app.engine('.jsx', jsxEngine.createEngine());
app.set('views', __dirname + '/views');

// Get the client
debug('Set initial static hosting for the client');
debug('dir name: ' + __dirname);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	debug('/ called, serving index.');
	debug('env = ' + env);
	//let IndexView = React.createFactory(Index);
	//res.send(ReactDOMServer.renderToString(IndexView({env: env})));
	res.render('index', {env: env}); // removed {layout: false} parameter
});

// Log all of the requests
if (env === 'development') {
	debug('Add listener to all to log everything.');
	app.all('*', function(req, res, next) {
		debug(req.method + ' ' + req.url);
		return next();
	});
}

// Load the routes we are going to use
debug('Loading routes - auth');
routes.auth_routes(app, passport);
debug('Loading routes - user');
routes.user_routes(app);
debug('Loading routes - org');
routes.organisation_routes(app);

// Capture requests to shutdown and do it cleanly
debug('Setting up shutdown cleanup, and responses.');
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Check if we are shutting down if we are respond nicely
app.use(function (req, res, next) {
	if (!shutdown) return next();

	res.setHeader('Connection', 'close');
	res.status(503).send('Service is in the process of closing.');
});

// Now set up for https
debug('Setting up https keys');
var privateKey	= fs.readFileSync(__dirname + '/keys/it-test-key.pem');
var certificate = fs.readFileSync(__dirname +'/keys/it-test-crt.crt');

// Finally start the server
debug('Setting up the server');
let server = https.createServer({key: privateKey, cert: certificate}, app).listen(port, function(){
	startup = false;
	console.log('Web-App Server, listening on port ' + port + ', environment is ' + env);
});


// On a shutdown request clean up nicely
function cleanup () {
	shutdown = true;
	debug('cleanup : shutting down.');

	server.close( function () {
		//mongoose.disconnect();
		process.exit();
	});

	setTimeout(function () {
		debug('cleanup : timed out, forcing shut down.');
		process.exit(1);
	}, app_cfg.shutdownTimout * 1000);
}
