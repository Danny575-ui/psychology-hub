
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('./db');
const authRoutes = require('./routes/auth');

const app = express();
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));

// Session Management
app.use(session({
  secret: 'psychology-hub-secret',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/mydatabase' })
}));

// Routes
app.use('/', authRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
