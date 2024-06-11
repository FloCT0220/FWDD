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
    
    router.get('/course', (req, res) => {
        const user = getUser(req);
        res.render('course', { user });
    });

    router.get('/quiz', (req, res) => {
        const user = getUser(req);
        if (user.student) {
            res.render('quiz', { user });
        } else {
            req.session.error = 'Please Login!';
            res.redirect('/login');
        }
    });

    router.get('/questions', (req, res) => {
        const query = 'SELECT id, quiz_question, quiz_answer FROM quiz ORDER BY RAND() LIMIT 10'; // Adjust SQL query as needed
        db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching questions:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.json(results);

        });
    }); 

    router.get('/displayQuestion', (req, res) => {
        const user = getUser(req);
       
        if (user && user.teacher) {      
            const query = 'SELECT * FROM quiz'; 
            db.query(query, (err, results) => {
                
                if (err) {
                    console.error('Error fetching questions:', err);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }
                
                const formattedResults = results.map(row => ({
                    id: row.id,
                    quiz_question: row.quiz_question,
                    quiz_answer: Boolean(row.quiz_answer)  
                }));
                        
                res.render('displayQuestion', { user, formattedResults });
            });
        } else {
            req.session.error = 'Please Login!';
            res.redirect('/login');
        }
    });

    return router;
};