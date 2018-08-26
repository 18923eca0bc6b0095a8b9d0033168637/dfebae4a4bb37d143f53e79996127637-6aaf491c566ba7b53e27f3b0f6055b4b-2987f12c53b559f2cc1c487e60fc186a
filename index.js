const { Client, Util } = require('discord.js');
const client = new Client();

var prefix = "mario!";

client.on('ready', () => {
	// nothing for now
});

client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => console.log('Yo this ready!'));

client.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));

client.on('reconnecting', () => console.log('I am reconnecting now!'));

function callAPI() {
  // TO DO
  let r = Math.random().toString(36).substring(7);
  client.channels.get(483223319361880084).send(r);
}

var timer = setTimeout(callAPI, 500);

client.login(process.env.TOKEN);
