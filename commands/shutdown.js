module.exports = {
	name: 'shutdown',
	description: 'Turns off the bot.',
	execute(message, args) {
		
		if( message.author.id == process.env.DEVID)
		{
		message.channel.send('Developer ID accepted. Shutting down the bot.');
		setTimeout(function() {
		process.exit();
		}, 3000);
		}
		else
		{
		message.channel.send('You are not the developer. Access is denied. In other words, fuck off, ya grimy twat.');
		}
	},
};