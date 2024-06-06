var express = require('express'); 
var router = express.Router(); 

// router.get('/logout', (req, res) => { 
//     req.session.destroy(err => { 
//         if(err) { // Handle error 
//             console.log(err); 
//             res.send('Error occurred during logout'); 
//         } else { // Redirect to login page after successful logout 
//             res.redirect('/login'); 
//         } 
//     }); 
// });

router.get('/dashboard', (req, res) => { 
    if (!req.session.user) { // User is not logged in, redirect to login page 
      res.redirect('/login'); 
    } else { 
      // User is logged in, render the dashboard 
      res.render('dashboard', { user_name: req.session.user_name }); 
    } 
});
    router.get('/logout', (req, res) => { 
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


module.exports = router