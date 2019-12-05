var express=require("express");
var mysql=require("mysql");
var session=require("express-session");
var bodyparser=require("body-parser");
const uuid=require("uuid");
const redis=require("redis");
const redisStore=require("connect-redis")(session);
var filestore=require("session-file-store")(session);
const redisClient=redis.createClient();
var path=require("path");
var app=express();
app.use(express.static("public"));
var connection=mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"mydb"
});
redisClient.on('error',(err)=>{
	console.log('redis err:',err);
});
app.use(session({genid:(req)=>{return uuid()},
secret:"secret",
resave:false,
saveUninitialized:false,
store:new redisStore({host:'localhost',port:6379,client:redisClient}),
cookie:{maxage:1000*10},
}));
app.use(bodyparser.urlencoded({extended:true}));
app.post('/validate',function(req,res){
	var username=req.body.username;
	var password=req.body.password;
	if(username && password)
	{
		connection.query('select * from users where username=? AND password=?',[username,password],function(err,result,field){
			if(result.length>0)
			{
				req.session.loggedin=true;
				req.session.username=username;
				req.redirect('/home');
			}
			else
			{
				res.end('incorrect');
			}
			res.end();
		});
	}
	else
	{
		res.send('plz enter username and password ');
		res.end();
	}
});
app.get('/home',function(req,res){
	if(req.session.loggedin)
	{
		res.send("welcome"+req.session.username+"<br>"+req.session.id+"!!!"+"<br><a href='./logout'>Logout</a>");
	}
	else
	{
		res.send('plz login to view the page');
	}
	res.end();
});
app.get('/logout',(req,res)=>{
	if(req.session.loggedin)
	{
		if(req.session)
		{
			req.session.destroy(function(err)
			{
				if(err)
				{
					return next(err);
				}
				else
				{
					return res.redirect('/login.html');
				}
			});
		}
	}
	else
	{
		res.redirect('/login.html');
	}
});
app.get('/',(req,res)=>{
	return res.sendFile(path.join(__dirname,'/login.html'));
});
app.listen(8000);