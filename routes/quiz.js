var express = require('express');
var router = express.Router();


  
/* GET course and quiz page. */
module.exports = (db) => {
    // const router = require('express').Router();

    // Middleware to fetch user information from session
    function getUser(req) {
        return {
            id: req.session.user_id || null,
            email: req.session.user_email || null,
            name: req.session.user_name || null,
            student: req.session.student || null,
            teacher: req.session.teacher || null,
        };
        
    }

    // Get Course Page
    router.get('/course', (req, res) => {
        const user = getUser(req);
        console.log(user);
        res.render('/course', { user });
    });

    // Get Quiz Page
    router.get('/quiz', (req, res) => {
        const user = getUser(req);
        console.log(user2);
        if (user.student) {
            res.render('quiz', { user });
        } else {
            req.session.error = 'Please Login!';
            res.redirect('/login');
        }
    });


    // Get Quiz Edit Page
    router.get('/displayQuestion', (req, res) => {
        const user = getUser(req);
        console.log("Test1")
        if (user.teacher) {
            console.log("Test2")
            const query = 'SELECT * FROM quiz'; // SQL query to fetch all quiz questions
            db.query(query, (err, results) => {
                console.log("Test3")
                if (err) {
                    console.error('Error fetching questions:', err);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }
                
                // Map results to format quiz_answer as boolean
                const formattedResults = results.map(row => ({
                    id: row.id,
                    quiz_question: row.quiz_question,
                    quiz_answer: Boolean(row.quiz_answer)  // Convert quiz_answer to boolean
                }));
                console.log("Test4")
                // Render the quizEdit view and pass user and formattedResults to it
                res.render('/displayQuestion', { user, formattedResults });
            });
        } else {
            console.log("Test4")
            req.session.error = 'Please Login!';
            res.redirect('/login');
        }


    });

    // fetch random questions
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

    return router;
};