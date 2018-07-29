const { Client, Util } = require('discord.js');
const client = new Client();

const queue = new Map();

var prefix = "mario!";
var adminID = "301073031801995264";

const commands = {
	'clear': (msg) => {
		let limit2 = msg.content.split(' ')[1];
		if (limit2 >= 100) {
			var MessagesToBeCleared = 100;
		} else {
			var MessagesToBeCleared = limit2;
		}
			if(msg.channel.permissionsFor(msg.member).hasPermission("MANAGE_MESSAGES")) {
				if (limit2 == '' || limit2 === undefined) {
					msg.channel.sendMessage(msg.author + " | Enter the number of messages to clear. :x:");
					return;
				} else {
					async function clear() {
						msg.delete();
						const fetched = await msg.channel.fetchMessages({limit: MessagesToBeCleared});
						msg.channel.bulkDelete(fetched);
					}
					clear();
					msg.channel.sendMessage(":white_check_mark: | Cleared " + MessagesToBeCleared + " messages.");
				}
			} else {
				msg.channel.sendMessage(msg.author + " | No permissions! :x:");
			}
		
	},
	'broadcast': (msg) => {
		let message2broadcast = msg.content.split(' ').splice(1).join(' ');
		if (!msg.channel.permissionsFor(msg.member).hasPermission("ADMINISTRATOR")) {
			msg.channel.sendMessage(msg.author + " | No permissions! :x:");
			return;
		} else {
			if (!message2broadcast) {

				msg.channel.sendMessage(msg.author + " | No message entered. :x:");

			} else {
				let tosend2 = ["`Sender:`", msg.author, "`Server:`", msg.guild.name, "`Message:`", message2broadcast];
				msg.channel.guild.members.forEach(user => {
					user.send(tosend2.join('\n'));
				});
				msg.channel.sendMessage(msg.author + " | Successfully broadcasted. :white_check_mark:");
			}
		}
	},
	'kick': (msg) => {
		if (!msg.channel.permissionsFor(msg.member).hasPermission("KICK_MEMBERS")) {
			msg.channel.sendMessage(msg.author + " | No permissions! :x:");
			return;
		} else {
			
			const user = msg.mentions.users.first();
			// If we have a user mentioned
			if (user) {
			  // Now we get the member from the user
			  const member = msg.guild.member(user);
			  // If the member is in the guild
			  if (member) {
				/**
				 * Kick the member
				 * Make sure you run this on a member, not a user!
				 * There are big differences between a user and a member
				 */
				member.sendMessage("You was kicked from " + client.guilds.size + " by " + msg.author);
				member.kick('Optional reason that will display in the audit logs').then(() => {
				  // We let the message author know we were able to kick the person
				  msg.channel.sendMessage(user + " was successfully kicked by " + msg.author + " | :white_check_mark:");
				}).catch(err => {
				  // An error happened
				  // This is generally due to the bot not being able to kick the member,
				  // either due to missing permissions or role hierarchy
				  msg.channel.sendMessage(msg.author + ' | I was unable to kick the member | :x:');
				  // Log the error
				  console.error(err);
				});
			  } else {
				// The mentioned user isn't in this guild
				msg.channel.sendMessage('That user isn\'t in this guild! | :x:');
			  }
			// Otherwise, if no user was mentioned
			} else {
			  msg.channel.sendMessage(msg.author + ' | You didn\'t mention the user to kick! | :x:');
			}
			
		}
	}
};

client.on('ready', () => {
	// nothing for now
});

client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => console.log('Yo this ready!'));

client.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));

client.on('reconnecting', () => console.log('I am reconnecting now!'));

client.on('message', msg => {
	if (!msg.content.startsWith(prefix)) return;
	if (commands.hasOwnProperty(msg.content.toLowerCase().slice(prefix.length).split(' ')[0])) commands[msg.content.toLowerCase().slice(prefix.length).split(' ')[0]](msg);
});


client.login(process.env.TOKEN);
