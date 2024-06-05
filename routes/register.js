var express = require('express'); 
var router = express.Router(); 

router.get('/', function(req, res) { 
  res.render('register'); 
}); 

router.post('/', function(req, res) { 
  var name = req.body.name; 
  var email = req.body.email; 
  var password = req.body.password; 
  const query = 'INSERT INTO users (user_name, user_email, user_password) VALUES (?, ?, ?)'; 
  req.db.query(query, [name, email, password], (err, results) => { 
    if (err) throw err; 
    res.redirect('/login'); 
  }); 
}); 

module.exports = router;