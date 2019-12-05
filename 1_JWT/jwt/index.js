var express=require('express');
const app=express();
var jwt=require('jsonwebtoken');
app.get('/api',function(req,res){
	res.json({
		text:'my api'
	});
});

app.post('/api/login',function(req,res){
	//auth user
	const user={id:3};
	const token=jwt.sign({user},'my_secret_key');
	res.json({
		token:token
	});
});

app.get('/api/protected',ensureToken,function(req,res){
	jwt.verify(req.token,'my_secret_key',function(err,data){
		if(err)
			res.sendStatus(403);
		else{

			res.json({
				text:'this is protected',
				data:data
			});
	}
	})
});

function ensureToken(req,res,next){
	const brearerHeader=req.headers['authorization'];
	if(typeof brearerHeader!=='undefined'){
		const bearer=brearerHeader.split(" ");
		const bearerToken=bearer[1];
		req.token=bearerToken;
		next();
	}else{
		res.sendStatus(403);
	}
}

app.listen(3000,function(){
	console.log('app listening on port 3000');
});