const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/edit/:id', (req, res) => {
    const contactId = req.params.id;
    const query = 'SELECT * FROM contacts WHERE id = ?';
    db.query(query, [contactId], (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.redirect('/');
      } else {
        res.render('edit', { contact: result[0] });
      }
    });
  });
  router.post('/edit/:id', (req, res) => {
    const contactId = req.params.id;
    const { name, email, phone } = req.body;
    const query = 'UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?';
    db.query(query, [name, email, phone, contactId], (err, result) => {
      if (err) throw err;
      res.redirect(`/user`);
    });
  });
  return router;
};