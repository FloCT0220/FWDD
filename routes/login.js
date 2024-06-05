var express = require('express'); 
var router = express.Router(); 

router.get('/login', (req, res) => { 
    res.render('login'); 
  });
  
  // Handle login form submission 
router.post('/login', (req, res) => {
    let sql = 'SELECT * FROM users WHERE user_email = ? AND user_password = ?';
    let query = db.query(sql, [req.body.useremail, req.body.userpassword], (err, result) => {
        if (err) throw err; 
        if (result.length > 0) {
        // Login successful, set session and redirect to dashboard
        req.session.user = result[0]; // Save the user object to the session
        req.session.user_name = result[0].user_name;
        res.redirect('/dashboard');
        } else {
        // Login failed, respond with error message
        res.send('Login failed');
        } 
    }); 
});

module.exports = router