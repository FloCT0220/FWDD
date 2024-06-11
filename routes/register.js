var express = require('express'); 
var router = express.Router(); 

module.exports = (db) => {

  router.get('/register', (req, res) => {
      const error = req.session.error;
      req.session.error = null;
      res.render('register', { error });    
  });

  router.post('/register', (req, res) => {
    const { user_name, user_email, user_password } = req.body;
    
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; 

    if (!passwordRegex.test(user_password)) {
      req.session.error = 'Password must be 6-20 characters long and contain at least one digit, one lowercase letter, and one uppercase letter.';
      return res.redirect('/register');
    }

    const query = 'INSERT INTO student (student_name, student_email, student_password) VALUES (?, ?, ?)';
    db.query(query, [user_name, user_email, user_password], (err, results) => {
      if (err) {
        console.error('Error registering user:', err);
        req.session.error = 'Error registering user.';
        return res.redirect('/register');
      }
      res.redirect('/login');
    });
  });

  return router;
};
