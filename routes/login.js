const express = require('express');
const router = express.Router();

module.exports = (db) => {

    router.get('/login', (req, res) => {
        const error = req.session.error;
        req.session.error = null;
        res.render('login', { error });
    });

    router.post('/login', (req, res) => {
        const {
            user_email,
            user_password
        } = req.body;

        if (user_email && user_password) {
            db.query('SELECT * FROM student WHERE student_email = ? AND student_password = ?', [user_email, user_password], (error, studentResults, fields) => {
                if (studentResults.length > 0) {
                    req.session.student = true;
                    req.session.user_email = user_email;
                    req.session.user_id = studentResults[0].id;
                    req.session.user_name = studentResults[0].student_name;
                    res.redirect('home');
                } else {
                    db.query('SELECT * FROM teacher WHERE teacher_email = ? AND teacher_password = ?', [user_email, user_password], (error, teacherResults, fields) => {
                        if (teacherResults.length > 0) {
                            req.session.teacher= true;
                            req.session.user_email = user_email;
                            req.session.user_id = teacherResults[0].id;
                            req.session.user_name = teacherResults[0].teacher_name;
                            res.redirect('home');
                        } else {
                            res.render('login', { error: 'Incorrect Email and/or Password!' });
                        }
                        res.end();
                    });
                }
            });
        } else {
            res.send('Please enter Username and Password!');
            res.end();
        }
    });

    router.get('/logout', (req, res) => {
        if (req.session) {
            req.session.destroy(function(err) {
                if(err) {
                    return next(err);
                } else {
                    return res.redirect('home');
                }
            });
        }
      });
    return router;
};