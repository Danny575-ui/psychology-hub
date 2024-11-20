const express = require('express');
const router = express.Router();
const User = require('../models/User'); // User model
const bcrypt = require('bcrypt'); // For password hashing

// Route to render the sign-up page
router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up' });
});

// Route to handle sign-up form submission
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
        return res.status(400).render('signup', { title: 'Sign Up', error: 'All fields are required' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create and save new user
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.redirect('/auth/login'); // Redirect to login page
    } catch (err) {
        console.error(err);
        res.status(500).render('signup', { title: 'Sign Up', error: 'Something went wrong, please try again' });
    }
});

// Route to render the login page
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

// Route to handle login logic
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
        return res.status(400).render('login', { title: 'Login', error: 'All fields are required' });
    }

    try {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).render('login', { title: 'Login', error: 'Invalid username or password' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).render('login', { title: 'Login', error: 'Invalid username or password' });
        }

        // Successful login (set up user session or token here)
        // For example: req.session.userId = user._id;

        res.redirect('/stories'); // Redirect to stories page
    } catch (err) {
        console.error(err);
        res.status(500).render('login', { title: 'Login', error: 'Something went wrong, please try again' });
    }
});

module.exports = router; // Export the router
