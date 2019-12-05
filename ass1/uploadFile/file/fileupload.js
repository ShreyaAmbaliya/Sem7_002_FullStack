var express=require("express");
var multer=require("multer");
var path=require("path");
var app=express();
app.use(express.static('public'));
var upload=multer({dest:'./upload'});
var option =multer.diskStorage({
	destination: function(res,file,cb)
	{
		if(file.mimetype!=='image/jpeg')
			return cb('invalid file format');
		cb(null,'./upload');
	},
	filename:function(req,file,cb){
		cb(null,(Math.random().toString(36)).slice(2,10)+Date.now()+path.extname(file.originalname));
	}
});
app.post('/photos_upload',upload.array('myfile',3),function(req,res,next){
	res.write(req.body.fname+" "+req.body.lname+"\n");
	res.write("file uploaded");
	res.end();	
})
app.use(function(err,req,res,next){
	if(err instanceof multer.MulterError)
	{
		console.log("Error");
		res.status(500).send("file upload err"+err.message);
	}
	else
	{
		next(err);
	}
});
app.listen(8000);