var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// database
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const db = mysql.createConnection({ 
  host: '127.0.0.1', 
  user: 'root', 
  password: '0220', 
  database: 'user', 
}); 

db.connect((err) => {
  if (err) { 
    console.error('Database connection failed:', err); 
  } else { 
    console.log('Connected to the database'); 
  } 
});



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);

// route database
const addressbookRoutes = require('./routes/addressbook')(db); 
app.use('/', addressbookRoutes); 

const addRoutes = require('./routes/add')(db); 
app.use('/', addRoutes);

const editRoutes = require('./routes/editContact')(db); 
app.use('/', editRoutes);

const deleteRoutes = require('./routes/deleteContact')(db); 
app.use('/', deleteRoutes);

var registerRoutes = require('./routes/register'); 
app.use('/register', registerRoutes);

const loginRoutes = require('./routes/login');
app.use('/login', loginRoutes); 

var checkEmailRoute = require('./routes/email')(db); 
app.use('/', checkEmailRoute);

// middle
const session = require('express-session');
app.use(session({ 
  secret: 'fwdd', 
  resave: false, 
  saveUninitialized: true, 
  cookie: { secure: true } // Note: the `secure` option should be enabled only if you are serving your app over HTTPS 
}));

//


app.get('/course', (req, res) => { 
  res.render('course'); 
});

app.get('/addressbook', (req, res) => { 
  res.render('addressbook'); 
});

app.get('/apple_info', (req, res) => { 
  res.render('apple_info'); 
});
app.get('/tab', (req, res) => { 
  res.render('tab'); 
});
app.get('/vid', (req, res) => { 
  res.render('vid'); 
});
app.get('/map', (req, res) => { 
  res.render('map'); 
});


// app.get('/login', (req, res) => { 
//   res.render('login'); 
// }); 

app.get('/register', (req, res) => { 
  res.render('register'); 
});

app.get('/dashboard', (req, res) => { 
  if (!req.session.user) { // User is not logged in, redirect to login page 
    res.redirect('/login'); 
  } else { 
    // User is logged in, render the dashboard 
    res.render('dashboard', { user_name: req.session.user_name }); 
  } 

  app.get('/logout', (req, res) => { 
    req.session.destroy(err => { 
      if(err) { 
        // Handle error 
        console.log(err); 
        res.send('Error occurred during logout'); 
      } else { 
        // Redirect to login page after successful logout 
        res.redirect('/login'); 
      } 
    }); 
  });
});

app.use(function(req, res, next) { 
  req.db = db; 
  next(); 
}); 



// Handle login form submission 
app.post('/login', (req, res) => { 
  let sql = 'SELECT * FROM user WHERE email = ? AND password = ?';
   let query = db.query(sql, [req.body.useremail, req.body.userpassword], (err, result) => { if (err) throw err; if (result.length > 0) { 
  // Login successful, set session and redirect to dashboard
    req.session.user = result[0]; // Save the user object to the session 
    req.session.user_name = result[0].user_name; 
    res.redirect('/dashboard'); 
} else { 
    // Login failed, respond with error message 
  res.send('Login failed'); } }); });

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

