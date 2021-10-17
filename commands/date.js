module.exports = {
	name: 'date',
	description: 'Display current date.',
	execute(message) {
		message.channel.send(`The date is ${Date()}`);
	},
};