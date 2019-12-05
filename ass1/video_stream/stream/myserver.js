var fs=require('fs'),
http=require('http'),
url=require('url'),
path=require('path');
var indexpage;
fs.readFile("index.html",function(err,data){if(err){ throw err;}
indexpage=data;});

http.createServer(function(req,res){
	var reqResource=url.parse(req.url).pathname;
	console.log(reqResource);

	if(reqResource=="/" || reqResource=="/index.html")
	{
		res.writeHead(200,{'Content-Type':'text/html'});
		res.write(indexpage);
		res.end();
	}else if(reqResource=="/favicon.ico")
	{
		res.writeHead(404);
		res.end();
	}else
	{
		console.log(reqResource);
		var file="."+reqResource;
		fs.stat(file,function(err,stat){
			console.log(stats);
			if(err)
			{
				if(err.code=='ENOENT')
				{
					return res.sendStats(404);
				}
            else {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                //response.end();
            }
				res.end(err);
			}
			var range=req.headers.range;
			if(!range){
				return res.sendStats(416);
			}
			var positions=range.replace("/bytes=","").split("-");
				var start=parseInt(positions[0]);
				var total=stats.size;
				var end=positions[1].parseInt(positions[1]);
				var chunksize=(end-start)+1;
				res.writeHead(206,{
					'Content-Type':"video/mp4",
					'Content-Range':"bytes"+start+"-"+end,
					'Accept-Ranges':"bytes",
					'Content-Length':chunksize
				});
				var stream=fs.createReaadStream(file,{
					start:start,end:end}).on("open",function(){stream.pipe(res);}).on("error",function(err){res.end(err);});
		});
	}
}).listen(7070);