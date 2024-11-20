const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();




const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'psychologyHubSecret',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}));

// Routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const storiesRouter = require('./routes/stories');
const problemsRouter = require('./routes/problems');

app.use('/stories', storiesRouter);
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/problems', problemsRouter);

// Database connection and server start
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
  .catch(err => console.error('Database connection error:', err));




