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
  
//   req.db.query(query, [name, email, password], (err, results) => { 
//     console.log("Hi"); // Log SQL query
//     if (err) 
//       // throw err; 
//     console.error('Error executing query:', err);
//     res.redirect('/login'); 
//   }); 
// }); 

router.post('/', function(req, res) {
  console.log('Received registration request:', req.body); // Log request body
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  const query = 'INSERT INTO users (user_name, user_email, user_password) VALUES (?, ?, ?)';
  console.log('Executing SQL query:', query); // Log SQL query
  console.log('Query parameters:', [name, email, password]); // Log query parameters

  req.db.query(query, [name, email, password], (err, results) => {
    if (err) {
      console.error('Error executing query:', err); // Log query execution error
      return res.status(500).send('Error occurred during registration'); // Send error response
    }
    console.log('Registration successful:', results); // Log query results
    res.redirect('/register');
  });
});

module.exports = router;


// module.exports = (db) => {
//   router.post('/register', (req, res) => { 
//     const { name, email, phone } = req.body; 
//     const query = 'INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)'; 
//     db.query(query, [name, email, phone], (err, results) => { 
//       if (err) throw err; 
//       res.redirect('/'); 
//     }); 
//   });

//   return router;
// };