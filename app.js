var express      = require('express');
var path         = require('path');
var favicon      = require('static-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var load 		 = require('express-load');
var mongoose     = require('mongoose');
var config       = require('./config/database');
var flash        = require('express-flash');
var moment 		 = require('moment');
var expressValidator = require('express-validator');

// Conectando com o MongoDB
mongoose.connect(config.database, (err) => {
	if(err){
		console.log("Conexão não foi bem sucedida, erro: "+ err);
	} else {
		console.log("Conexão com MongoDB estabelecida com sucesso");
	}
});
var db = mongoose.connection;

// Init Express
var app = express();

// Middlewares
var erros = require('./middleware/erros');

// Setup das views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Config dos Middlewares
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(expressValidator());
app.use(cookieParser());
app.use(session({ 
	secret: 'taqueopa', 
	resave: true,
  	saveUninitialized: false}));
app.use(flash());

// Config de Helprs
app.use(function(req,res,next){
	res.locals.moment = moment;
	res.locals.session = req.session.user;
	res.locals.isLogged = req.session.user ? true : false;
	next();
});

// Controlador de rotas
load('models').then('controllers').then('routes').into(app);
app.use(express.static(path.join(__dirname, '/public')));

app.use(erros.notfound);
app.use(erros.serverError);

app.listen(3000, function() {
    console.log('Express server listening on port 3000');
});