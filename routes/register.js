var express = require('express'); 
var router = express.Router(); 

router.get('/', (req, res) => {
  res.render('register'); // Example route definition
});


// router.post('/', function(req, res) { 
//   var name = req.body.name; 
//   var email = req.body.email; 
//   var password = req.body.password; 
//   const query = 'INSERT INTO users (user_name, user_email, user_password) VALUES (?, ?, ?)'; 
//   console.log('Executing SQL query:', query); // Log SQL query
//   req.db.query(query, [user_name, user_email, user_password], (err, results) => { 
//     if (err) 
//       // throw err; 
//     console.error('Error executing query:', err);
//     res.redirect('/register'); 
//   }); 
// }); 

// module.exports = router;


module.exports = (db) => {
  router.post('/register', (req, res) => { 
    const { name, email, phone } = req.body; 
    const query = 'INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)'; 
    db.query(query, [name, email, phone], (err, results) => { 
      if (err) throw err; 
      res.redirect('/'); 
    }); 
  });

  return router;
};