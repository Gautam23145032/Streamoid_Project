const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require("path");

const viewRoutes = require('./routes/viewRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', viewRoutes);

app.get('/health', (req, res) => res.json({ ok: true }));

app.get('/test', (req, res) => res.redirect('/'));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
