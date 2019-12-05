Chatbot=require('./chatbot');
var readline=require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
//var rl=readline.createInterface(process.stdin,process.stdout);
rl.setPrompt('you==>');
rl.prompt();
rl.on('line',function(message){
	console.log('Bot==>'+Chatbot.chatbotReply(message))
	rl.prompt();
}).on('close',function(){
	process.exit(0);
});
