const Discord = require('discord.js');
const client = new Discord.Client();

client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => console.log('ProBot credits hack is running...'));

client.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));

client.on('reconnecting', () => console.log('I am reconnecting now!'));

function timerFunc() {
  client.on('message', msg => {
		client.guilds.get("470310098150096906").channels.get("483223319361880084").send(Math.random().toString(36).substring(7))
	});
}

var timer = setTimeout(timerFunc, 1000);

client.login(process.env.TOKEN);
