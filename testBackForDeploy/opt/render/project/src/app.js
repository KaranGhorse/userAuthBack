require('dotenv').config()
require('./DB/connection')

var express = require('express');
var path = require('path');
const cookieParser = require('cookie-parser')
var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.listen(3000, ()=>{
    console.log('app listining on'+ 3000);
})
