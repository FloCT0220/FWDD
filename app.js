var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// database
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const session = require('express-session');

const db = mysql.createConnection({
  host: '127.0.0.1', 
  user: 'root', 
  password: '0220', 
  database: 'user', 
});

var app = express();

// session config

app.use(session({ 
  secret: 'fwdd', 
  resave: false, 
  saveUninitialized: true, 
  cookie: { secure: false } // Note: the `secure` option should be enabled only if you are serving your app over HTTPS 
}));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


///////// route database ////////////

var indexRouter = require('./routes/index'); 4
app.use('/', indexRouter);

var usersRouter = require('./routes/users'); 9
app.use('/user', usersRouter);

const loginRoute = require('./routes/login')(db); 5
app.use(loginRoute);

const homeRoute = require('./routes/home')(db); 3
app.use(homeRoute);

const registerRoute = require('./routes/register')(db); 8
app.use(registerRoute);

const quizRoute = require('./routes/quiz')(db); 7
app.use(quizRoute);

const manageRoute = require('./routes/manage')(db); 6
app.use(manageRoute);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;

