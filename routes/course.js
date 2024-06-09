var express = require('express');
var router = express.Router();


/* GET home page. */
module.exports = (db) => {
    router.get('/course', (req, res) => {
        const user = {
            id: req.session.user_id || null,
            email: req.session.user_email || null,
            name: req.session.user_name || null
        };
        res.render('course', { user });
    });






  return router;
  };