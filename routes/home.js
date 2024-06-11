var express = require('express');
var router = express.Router();


/* GET home page. */
module.exports = (db) => {
    router.get('/home', function(req, res, next) {
      const user = {
        id: req.session.user_id || null,
        email: req.session.user_email || null,
        name: req.session.user_name || null,
        teacher: req.session.teacher || null,
        student: req.session.student || null,
      };
      res.render('home', { user });
    });
  return router;
  };