const express = require('express');
const router = express.Router();

module.exports = (db) => {

    function getUser(req) {
        return {
            id: req.session.user_id || null,
            email: req.session.user_email || null,
            name: req.session.user_name || null,
            student: req.session.student || null,
            teacher: req.session.teacher || null,
        };
        
    }

    router.get('/add', (req, res) => {
        const user = getUser(req);
        res.render('addEditQuiz', {user});
    });

    router.post('/add', (req, res) => {
        const user = getUser(req);
        const { question, answer } = req.body;
        const query = 'INSERT INTO quiz (quiz_question, quiz_answer) VALUES (?, ?)';
        
        db.query(query, [question, answer], (err, results) => {
            if (err) {
                console.error('Error adding quiz question:', err);
                return res.status(500).send('Error adding quiz question');
            }
            
            res.redirect('/displayQuestion', user);
        });
    });
    return router;
};
