var http=require('http');
var express=require('express');
var mongoose=require('mongoose');
var bodyparser=require('body-parser');
var cors=require('cors');
var appRoutes=require('./routes/appRoutes');
var port=3200;

var app=express();

mongoose.connect('mongodb://localhost/myempdb',{useUnifiedTopology:true,useNewUrlParser:true});
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors());
app.use('/',appRoutes);


http.createServer(app).listen(port);

console.log('Server running at: ',port);