const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/delete/:id', (req, res) => {
    const contactId = req.params.id;
    const query = 'DELETE FROM contacts WHERE id = ?';
    db.query(query, [contactId], (err, result) => {
      if (err) throw err;
      res.redirect(`/user`);
    });
  });
  return router;
};