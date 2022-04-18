const express = require('express');
const bodyParser = require('body-parser');
const override = require('method-override');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(override());

app.set('port', '4000');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(require('./routes/index'));

module.exports = app;