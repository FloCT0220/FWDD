var express = require('express'); 
var router = express.Router(); 

router.get('/dashboard', (req, res) => { 
    if (!req.session.user) { 
        // User is not logged in, redirect to login page 
        res.redirect('/login'); 
    } else { // User is logged in, render the dashboard 
        res.render('dashboard', { user_name: req.session.user_name }); 
    } 
});