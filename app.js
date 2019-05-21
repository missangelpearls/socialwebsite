'use strict';
const https = require('https')
const fs = require('fs')
const express = require('express');
const server = express();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const session = require("express-session");
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const redis = require("redis");
const client  = redis.createClient();
//const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
require('./passport')(passport);

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;


var hbs = exphbs.create({
    defaultLayout: 'main',
    helpers: {
        ifEquals: function(arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        }
    }

});

// Middleware
server.use(helmet());
//server.use(redirectToHTTPS());
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());
server.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-origin','*');
    res.setHeader('Access-Control-Allow-methods','GET,POST');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type, Authorization');
    next();
}); 

server.engine('handlebars', hbs.engine);
server.set('view engine', 'handlebars'); 
server.use(session({ secret: process.env.SECRET,  resave: false, saveUninitialized: false,  store: new RedisStore({host: 'localhost', port: 6379, client: client}) }));
server.use(passport.initialize());
server.use(passport.session());



//Static Folder
server.use(express.static('public'));


//Routes
require('./routes')(server, passport);


const httpsOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/www.smallworldthat.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/www.smallworldthat.com/cert.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/www.smallworldthat.com/chain.pem')
  };


if(process.env.APP_ENV === 'developer')
    https.createServer(httpsOptions, server).listen(3030);
else if(process.env.APP_ENV === 'production')
    https.createServer(httpsOptions, server).listen(443);







