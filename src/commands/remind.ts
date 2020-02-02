import * as Discord from "discord.js";

export const avatar = (
  client: Discord.Client,
  message: Discord.Message,
  args: any[],
) => {
		try {


			var returntime;
			var timemeasure;
			message = message.content.split(' ');
			console.log('Message recieved from ' + message.author.id + ' at ' + Date.now().toString());


			timemeasure = message[1].substring((message[1].length - 1), (message[1].length))
			returntime = message[1].substring(0, (message[1].length - 1))

			// Based off the delimiter, sets the time
			switch (timemeasure) {
				case 's':
					returntime = returntime * 1000;
					break;

				case 'm':
					returntime = returntime * 1000 * 60;
					break;

				case 'h':
					returntime = returntime * 1000 * 60 * 60;
					break;

				case 'd':
					returntime = returntime * 1000 * 60 * 60 * 24;
					break;

				default:
					returntime = returntime * 1000;
					break;
			}

			// Returns the Message
			client.setTimeout(function () {
				// Removes the first 2 array items
				message.shift();
				message.shift();

				// Creates the message
				var content = message.join();
				content = content.replaceAll(',', ' ');
				message.reply(content);
				console.log('Message sent to ' + message.author.id + ' at ' + Date.now().toString());
			}, returntime)
		} catch (e) {
			message.reply("Please make sure the command has a time delimiter and message");
			console.error(e.toString());
		}

	// List of commands
	} else if (message.content.toLowerCase().startsWith('!remind')) {
		try {

			// Variables
			var returntime;
			var timemeasure;
			var userid;
			message = message.content.split(' ');
			console.log('Message recieved from ' + message.author.id + ' at ' + Date.now().toString());

			// Sets the userid for the recipiant
			userid = client.users.get(message[1].replace('<@!', '').slice(0, -1))

			// Sets the return time
			timemeasure = message[2].substring((message[2].length - 1), (message[2].length))
			returntime = message[2].substring(0, (message[2].length - 1))

			// Based off the delimiter, sets the time
			switch (timemeasure) {
				case 's':
					returntime = returntime * 1000;
					break;

				case 'm':
					returntime = returntime * 1000 * 60;
					break;

				case 'h':
					returntime = returntime * 1000 * 60 * 60;
					break;

				case 'd':
					returntime = returntime * 1000 * 60 * 60 * 24;
					break;

				default:
					returntime = returntime * 1000;
					break;
			}

			// Returns the Message
			client.setTimeout(function () {
				// Removes the first 2 array items
				message.shift();
				message.shift();
				message.shift();

				// Creates the message
				var content = message.join();
				content = content.replaceAll(',', ' ');
				message.channel.send(userid + content);
				console.log('Message sent to ' + userid + ' at ' + Date.now().toString());
			}, returntime)
		} catch (e) {
			message.reply("Please make sure the command has a time delimiter and message");
			console.error(e.toString());
		}
};
