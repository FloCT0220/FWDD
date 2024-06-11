var express = require('express');
var router = express.Router();

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

    router.get('/delete/:id', (req, res) => {
        const questionID = req.params.id;
        const query = 'DELETE FROM quiz WHERE id = ?';        
        db.query(query, [questionID], (err, result) => {
            if (err) {
                console.error('Error deleting quiz question:', err);
                res.status(500).json({ error: 'Failed to delete quiz question' });
                return;
            }            
            res.redirect('/displayQuestion');
        });
    });

    router.get('/EditQuiz/:id', (req, res) => {
        const user = getUser(req);
        const questionID = req.params.id;
        const query = 'SELECT * FROM quiz WHERE id = ?';
        db.query(query, [questionID], (err, result) => {
            if (err) {
                console.error('Error fetching question details:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
    
            if (result.length === 0) {
                res.redirect('/displayQuestion'); 
            } else {
                const question = {
                    id: result[0].id,
                    quiz_question: result[0].quiz_question,
                    quiz_answer: Boolean(result[0].quiz_answer)
                };
                res.render('addEditQuiz', { question ,user }); 
            }
        });
    });

    router.post('/EditQuiz/:id', (req, res) => {        
        const questionId = req.params.id;        
        const { question, answer } = req.body;
        const query = 'UPDATE quiz SET quiz_question = ?, quiz_answer = ? WHERE id = ?';
        
        db.query(query, [question, answer, questionId], (err, result) => {
            
            if (err) throw err;
            res.redirect('displayQuestion');
        });
    });

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
            
            res.redirect('/displayQuestion');
        });
    });





    
    return router;
};