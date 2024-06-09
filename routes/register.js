var express = require('express'); 
var router = express.Router(); 

module.exports = (db) => {

  router.get('/register', (req, res) => {
      res.render('register');    
  });

  router.post('/register', (req, res) => {
    const { user_name, user_email, user_password } = req.body;  

    const query = 'INSERT INTO student (student_name, student_email, student_password) VALUES (?, ?, ?)';
    db.query(query, [user_name, user_email, user_password], (err, results) => {
        if (err) throw err;
        res.redirect('/login');
    });
  });

  return router;
};
