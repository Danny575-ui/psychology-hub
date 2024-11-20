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

module.exports = router;
