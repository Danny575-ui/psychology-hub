const express = require('express');
const router = express.Router();

// Sample stories data (in a real app, you'd fetch this from a database)
const stories = [
  {
    title: 'A Journey Through Depression',
    content: 'This is a story about someone overcoming depression...',
    author: 'User1',
    date: new Date(),
  },
  {
    title: 'Finding Hope in Anxiety',
    content: 'An account of how one learns to manage anxiety...',
    author: 'User2',
    date: new Date(),
  },
];

// Render stories page
router.get('/', (req, res) => {
  res.render('stories', { stories });
 });


router.post('/submit', (req, res) => {
  const { title, content, author } = req.body; // Get data from the request
  if (title && content && author) {
      // Push the new problem into the in-memory array
      stories.push({
          title,
          content,
          author,
          date: new Date(),
      });
      res.redirect('/stories'); // Redirect to problems page after submission
  } else {
      res.status(400).send('All fields are required.');
  }
});

module.exports = router;
