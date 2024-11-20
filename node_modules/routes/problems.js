const express = require('express');
const router = express.Router();

// Sample in-memory problems array (in a real application, you would use a database)
let problems = [
    {
        title: 'Coping with Anxiety',
        content: 'I have been feeling anxious lately and don’t know how to cope...',
        author: 'User1',
        date: new Date(),
    },
    {
        title: 'Dealing with Stress',
        content: 'Work has been stressful and it’s affecting my sleep...',
        author: 'User2',
        date: new Date(),
    },
];

// Route to render the problems page
router.get('/', (req, res) => {
    res.render('problems', { problems });
});

// Route to handle posting a new problem
router.post('/submit', (req, res) => {
    const { title, content, author } = req.body; // Get data from the request
    if (title && content && author) {
        // Push the new problem into the in-memory array
        problems.push({
            title,
            content,
            author,
            date: new Date(),
        });
        res.redirect('/problems'); // Redirect to problems page after submission
    } else {
        res.status(400).send('All fields are required.');
    }
});

module.exports = router; // Export the router
