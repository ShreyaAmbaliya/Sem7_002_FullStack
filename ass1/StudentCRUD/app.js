const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const path = require('path');
const StudentRoute = require('./routes/StudentRoute');

app.set('view engine','pug');
app.set('views',path.join(__dirname + '/views'));

app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use('/StudentInfo',StudentRoute);

app.listen(8000, (req,res) =>{
	console.log('Server is started at 8000');
})