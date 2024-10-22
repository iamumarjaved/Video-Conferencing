
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const indexRoutes = require('./api/routes/indexRoutes');
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('common'));
app.use('/', indexRoutes);


app.exports = app;