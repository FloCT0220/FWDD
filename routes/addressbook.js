const express = require('express'); 
const router = express.Router(); 

module.exports = (db) => { 
  router.get('/user', (req, res) => { 
    db.query('SELECT * FROM contacts', (err, results) => { 
      if (err) throw err; 
      res.render('user', { contacts: results }); 
    }); 
  }); 
  router.post('/user', (req, res) => {
    const searchKey = req.body.searchkey;
    const sql = 'SELECT * FROM contacts WHERE name LIKE ?';
    db.query(sql, [`%${searchKey}%`], (err, results) => {
      if (err) throw err;
      res.render('user', { contacts: results });
    });
  });
  return router; 
};