var express = require('express'); 
var router = express.Router(); 

router.get('/logout', (req, res) => { 
    req.session.destroy(err => { 
        if(err) { // Handle error 
            console.log(err); 
            res.send('Error occurred during logout'); 
        } else { // Redirect to login page after successful logout 
            res.redirect('/login'); 
        } 
    }); 
});